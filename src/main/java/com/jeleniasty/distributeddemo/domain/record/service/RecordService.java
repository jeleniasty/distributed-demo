package com.jeleniasty.distributeddemo.domain.record.service;

import com.jeleniasty.distributeddemo.domain.record.dto.CreateRecordDto;
import com.jeleniasty.distributeddemo.domain.record.dto.RecordDetailsDto;
import com.jeleniasty.distributeddemo.domain.record.dto.RecordDto;
import com.jeleniasty.distributeddemo.domain.record.entity.Record;
import com.jeleniasty.distributeddemo.domain.record.exception.RecordException;
import com.jeleniasty.distributeddemo.domain.record.repository.RecordRepository;
import com.jeleniasty.distributeddemo.shared.model.PagedResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecordService {

    private final RecordRepository recordRepository;

    @CacheEvict(
            value = {"record-pages", "record-count"},
            allEntries = true
    )
    @Transactional
    public void createRecord(CreateRecordDto dto) {
        log.info("Creating new record with data: {}", dto);
        var record = recordRepository.save(new Record(dto.description()));
        log.info("Record [id: {}] has been created", record.getId());
    }

    @Cacheable(value = "records", key = "#id")
    @Transactional(readOnly = true)
    public RecordDetailsDto getRecord(Long id) {
        log.info("Getting record with id: {}", id);
        return recordRepository.findById(id)
                .map(record -> new RecordDetailsDto(
                        record.getId(),
                        record.getDescription(),
                        record.getCreatedAt(),
                        record.getCreatedBy()))
                .orElseThrow(() -> RecordException.notFound(id));
    }

    @Cacheable(value = "record-pages", key = "#root.target.getRecordsCacheKey(#pageable)")
    @Transactional(readOnly = true)
    public PagedResponse<RecordDto> getRecords(Pageable pageable) {
        log.info("Getting records... [{}]", getRecordsCacheKey(pageable));
        Page<Record> page = recordRepository.findAll(pageable);
        return new PagedResponse<>(
                page.getContent().stream().map(record -> new RecordDto(
                        record.getId(),
                        record.getDescription())
                ).toList(),
                page.getTotalElements(),
                page.getNumber(),
                page.getSize()
        );
    }

    public String getRecordsCacheKey(Pageable pageable) {
        return "page=" + pageable.getPageNumber() +
                ",size=" + pageable.getPageSize() +
                ",sort=" + pageable.getSort().stream()
                .map(s -> s.getProperty() + "-" + s.getDirection())
                .collect(Collectors.joining(","));
    }

    @Cacheable(value = "record-count")
    @Transactional(readOnly = true)
    public Number  getRecordsCount() {
        return recordRepository.count();
    }
}

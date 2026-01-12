package com.jeleniasty.distributeddemo.domain.record.service;

import com.jeleniasty.distributeddemo.domain.record.dto.RecordDetailsDto;
import com.jeleniasty.distributeddemo.domain.record.exception.RecordException;
import com.jeleniasty.distributeddemo.domain.record.dto.CreateRecordDto;
import com.jeleniasty.distributeddemo.domain.record.dto.RecordDto;
import com.jeleniasty.distributeddemo.domain.record.entity.Record;
import com.jeleniasty.distributeddemo.domain.record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecordService {

    private final RecordRepository recordRepository;

    @CacheEvict(
            value = "record-pages",
            allEntries = true
    )
    @Transactional
    public void createRecord(CreateRecordDto dto) {
        log.info("Creating new record with data: {}", dto);
        var record = recordRepository.save(new Record(dto.description()));
        log.info("Record [id: {}] has been created", record.getId());
    }

    @Cacheable(
            value = "records",
            key = "#id"
    )
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

    @Cacheable(
            value = "record-pages",
            key = "'page=' + #pageable.pageNumber + ',size=' + #pageable.pageSize"
    )
    @Transactional(readOnly = true)
    public Page<RecordDto> getRecords(Pageable pageable) {
        log.info("Getting records... [page {}, size {}]", pageable.getPageNumber(), pageable.getPageSize());
        return recordRepository
                .findAll(pageable)
                .map(record -> new RecordDto(
                        record.getId(),
                        record.getDescription())
                );
    }
}

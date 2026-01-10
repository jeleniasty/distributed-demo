package com.jeleniasty.distributeddemo.domain.record.service;

import com.jeleniasty.distributeddemo.domain.record.exception.RecordException;
import com.jeleniasty.distributeddemo.domain.record.dto.CreateRecordDto;
import com.jeleniasty.distributeddemo.domain.record.dto.RecordDto;
import com.jeleniasty.distributeddemo.domain.record.entity.Record;
import com.jeleniasty.distributeddemo.domain.record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;

    @Transactional
    public void createRecord(CreateRecordDto dto) {
        recordRepository.save(new Record(dto.description()));
    }

    @Transactional(readOnly = true)
    public RecordDto getRecord(Long id) {
        return recordRepository.findById(id)
                .map(record -> new RecordDto(
                        record.getId(),
                        record.getDescription()))
                .orElseThrow(() -> RecordException.notFound(id));
    }
}

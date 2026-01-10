package com.jeleniasty.distributeddemo.domain.record.controller;

import com.jeleniasty.distributeddemo.domain.record.dto.CreateRecordDto;
import com.jeleniasty.distributeddemo.domain.record.dto.RecordDto;
import com.jeleniasty.distributeddemo.domain.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/records")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService recordService;

    @PostMapping
    public void saveRecord(@RequestBody CreateRecordDto dto) {
        recordService.createRecord(dto);
    }

    @GetMapping(value = "/{id}")
    public RecordDto getRecord(@PathVariable Long id) {
        return recordService.getRecord(id);
    }
}
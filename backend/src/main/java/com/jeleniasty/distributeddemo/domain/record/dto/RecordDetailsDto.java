package com.jeleniasty.distributeddemo.domain.record.dto;

import java.time.LocalDateTime;

public record RecordDetailsDto(Long id, String description, LocalDateTime createdAt, String createdBy) {
}

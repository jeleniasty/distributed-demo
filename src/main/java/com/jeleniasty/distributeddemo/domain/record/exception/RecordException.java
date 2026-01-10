package com.jeleniasty.distributeddemo.domain.record.exception;

public class RecordException extends RuntimeException {

    private RecordException(String message) {
        super(message);
    }

    public static RecordException notFound(Long id) {
        return new RecordException("Record [id: " + id + "] not found");
    }
}

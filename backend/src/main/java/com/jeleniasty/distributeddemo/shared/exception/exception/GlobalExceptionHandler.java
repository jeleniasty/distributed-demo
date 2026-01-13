package com.jeleniasty.distributeddemo.shared.exception.exception;

import com.jeleniasty.distributeddemo.domain.record.exception.RecordException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.UUID;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(RecordException.class)
    public ProblemDetail handleRecordException(RecordException exception) {
        log.error("RecordException has been thrown. Returning 400 http status with message: {}", exception.getMessage());
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, exception.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleInternalServerError(Exception exception) {
        var errorUUID = UUID.randomUUID().toString();
        log.error("Exception [id: {}]: " , errorUUID, exception);
        return ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, errorUUID);
    }
}

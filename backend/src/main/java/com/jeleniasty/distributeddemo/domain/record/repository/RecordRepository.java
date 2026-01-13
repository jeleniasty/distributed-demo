package com.jeleniasty.distributeddemo.domain.record.repository;

import com.jeleniasty.distributeddemo.domain.record.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
}

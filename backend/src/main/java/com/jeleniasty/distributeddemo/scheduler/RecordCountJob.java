    package com.jeleniasty.distributeddemo.scheduler;

    import com.jeleniasty.distributeddemo.domain.record.service.RecordService;
    import lombok.RequiredArgsConstructor;
    import lombok.extern.slf4j.Slf4j;
    import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.messaging.simp.SimpMessagingTemplate;
    import org.springframework.scheduling.annotation.Scheduled;
    import org.springframework.stereotype.Component;

    @Component
    @RequiredArgsConstructor
    @Slf4j
    public class RecordCountJob {

        @Value("${jobs.records-count.topic}")
        private String topic;

        private final RecordService recordService;
        private final SimpMessagingTemplate messagingTemplate;

        @Scheduled(fixedRateString = "${jobs.records-count.interval:10000}")
        @SchedulerLock(name = "recordCountJob", lockAtLeastFor = "PT3S", lockAtMostFor = "PT10S")
        public void publishRecordCount() {
            log.info("Publishing record count...");
            var count = recordService.getRecordsCount();
            messagingTemplate.convertAndSend(topic, count);
            log.info("Published record count [{}] to destination [{}]", count, topic);
        }
    }

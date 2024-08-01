package com.ssafy.ptpt.api.evaluation.service;

import com.ssafy.ptpt.db.repository.StatisticRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatisticService {
    private final StatisticRepository statisticRepository;
}

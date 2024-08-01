package com.ssafy.ptpt.api.statistic.controller;

//import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistic")
public class StatisticController {

    @GetMapping("/{statisticId}")
    @Operation(summary = "통계 조회")
    public ResponseEntity<?> viewStatistic(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

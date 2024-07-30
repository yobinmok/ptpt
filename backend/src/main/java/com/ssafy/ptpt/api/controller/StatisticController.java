package com.ssafy.ptpt.api.controller;

//import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistic")
public class StatisticController {

    @GetMapping("/{statisticNo}")
//    @ApiOperation(value = "통계 조회")
    public ResponseEntity<?> viewStatistic(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

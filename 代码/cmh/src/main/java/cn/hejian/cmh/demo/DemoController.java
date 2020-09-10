package cn.hejian.cmh.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class DemoController {
    @GetMapping(value = "hello")
    public HashMap hello(){
        HashMap hashMap = new HashMap();
        hashMap.put("message", "hello");
        return hashMap;
    }
}

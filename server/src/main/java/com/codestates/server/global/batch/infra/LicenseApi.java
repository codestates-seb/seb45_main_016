package com.codestates.server.global.batch.infra;

import com.codestates.server.domain.license.licensedate.dto.LicenseTop5Dto;
import com.codestates.server.domain.license.licenseinfo.entity.LicenseInfo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

public class LicenseApi {

    /**
     * API를 호출하고 나온값을 String으로 받아서 넘겨준다.
     * @param licenseInfo
     * @return string
     * @throws IOException
     */
    public String callApiToString(LicenseInfo licenseInfo) throws IOException {

        LicenseTop5Dto licenseTop5Dto = new LicenseTop5Dto();

        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B490007/qualExamSchd/getQualExamSchdList"); /*URL*/
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=hN6HzankT%2Bi7Qds9PJjAjFb6R6xzw5DAvqBHMSOjw4yaA98ubFd6IRzWT8Kz5CcCiksKJz7qPFdZOsOcjjn4MA%3D%3D"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
        urlBuilder.append("&" + URLEncoder.encode("dataFormat","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*응답 데이터 표준 형식 - xml / json (대소문자 구분 없음)*/
        urlBuilder.append("&" + URLEncoder.encode("implYy","UTF-8") + "=" + URLEncoder.encode("2023", "UTF-8")); /*시행년도*/
        urlBuilder.append("&" + URLEncoder.encode("qualgbCd","UTF-8") + "=" + URLEncoder.encode("T", "UTF-8")); /*자격구분코드 - T : 국가기술자격 - C : 과정평가형자격 - W : 일학습병행자격 - S : 국가전문자격*/
        urlBuilder.append("&" + URLEncoder.encode("jmCd","UTF-8") + "=" + URLEncoder.encode(String.valueOf(licenseInfo.getCode()), "UTF-8")); //종목코드값 필요.
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();

        System.out.println("sb" + sb);

        return String.valueOf(sb); // string으로 리턴 (json값을 가지고 있음)
    }

}

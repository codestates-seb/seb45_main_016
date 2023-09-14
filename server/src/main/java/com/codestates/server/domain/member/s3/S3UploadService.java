package com.codestates.server.domain.member.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class S3UploadService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;


    public String uploadProfileImage(MultipartFile image, int x, int y, int width, int height) throws IOException {

        // 원본 파일 이름 가지고 와서 UUID 추가 후 새로운 이름 생성
        // UUID : 고유식별자 부여 -> 파일 중복 업로드를 막아준다
        String originName = image.getOriginalFilename();
        String ext = originName.substring(originName.lastIndexOf(".")+1); // 확장자
        String changedName = UUID.randomUUID().toString() + ext;

        // 이미지 크기 조정
        BufferedImage originalImage = ImageIO.read(image.getInputStream());
        // 프론트에서 파라미터로 x,y좌표, 너비 받아오기
        BufferedImage croppedImage = cropImage(originalImage, x, y, width, height);
        // 자른 이미지 resizing
        BufferedImage resizedImage = resizedImage(croppedImage, 400);
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        ImageIO.write(resizedImage, ext, os);
        InputStream inputStream = new ByteArrayInputStream(os.toByteArray());

        // 메타데이터 설정
        // 메타데이터 : 데이터에 대한 데이터 (S3에 업로드 되는 파일의 추가정보)
        ObjectMetadata metadata = new ObjectMetadata();
        // 이미지 콘텐츠 타입 set
        metadata.setContentType(image.getContentType());
        // 이미지 사이즈 set(400*400) 리사이징
        metadata.setContentLength(os.size());

        String folderName = "profile-image/";
        String  s3ObjectName = folderName + changedName;
        try {
            // S3에 이미지 업로드
            amazonS3.putObject(new PutObjectRequest(bucket, s3ObjectName, inputStream, metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            log.info("✨ Image successfully uploaded to S3 ✨ URL: {}", amazonS3.getUrl(bucket, changedName));
        } catch (Exception e) {
            log.error("🚨 Image Upload Error to 🚨", e);
            throw e ;
        }

        inputStream.close();
        log.info("✨ uploadProfileImage completed✨  Result URL: {}", amazonS3.getUrl(bucket, changedName));
        // 업로드 된 이미지 URL 반환
        return amazonS3.getUrl(bucket, changedName).toString();
    }

    // S3에서 이미지 삭제하는 메서드
    public void deleteImageFromS3(String imageUrl) {
        log.info("🗑️ deleteImageFromS3 started 🗑️ URL: {}", imageUrl);
        // 삭제할 이미지가 S3 버킷에 있는지 확인
        if(imageUrl.contains("https://s3.ap-northeast-2.amazonaws.com/"+ bucket)) {
            // https://s3.ap-northeast-2.amazonaws.com/your-bucket-name/image-folder/image.jpg 형태이기 때문에 [6] 를 삭제한다
            String objectKey = imageUrl.split("/")[6];
            amazonS3.deleteObject(bucket, objectKey);
            log.info("✨ Successfully deleted image from S3✨: {}", objectKey);
        }
    }

    // 원하는 위치에서 정한 사이즈(400*400)크기 만큼 자르기
    private BufferedImage cropImage(BufferedImage originalImage, int x, int y, int width, int height) {
        return originalImage.getSubimage(x, y, width, height);
    }

    // 이미지 사이즈 resized
    private BufferedImage resizedImage(BufferedImage croppedImage, int profileWidth)  throws IOException {

        int originalWidth = croppedImage.getWidth();
        int originalHeight = croppedImage.getHeight();

        // 원본 이미지의 크기가 profileWidth 보다 작은 경우, 원본 그대로 반환
        if (originalWidth <= profileWidth && originalHeight <= profileWidth) {
            return croppedImage;
        }

        // 새로운 크기로 변환
        int newWidth = profileWidth;
        int newHeight = profileWidth;

        // 새로운 BufferedImage 객체 생성
        BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_ARGB);

        // Graphics2D 객체 얻기
        Graphics2D g = resizedImage.createGraphics();

        // 이미지 리사이징
        g.drawImage(croppedImage, 0, 0, newWidth, newHeight, null);
        g.dispose(); // Graphics2D 리소스 해제

        return resizedImage;
    }
}


//    // MultipartFile을 전달받아 File로 전환한 후 S3에 업로드
//    public String uploadProfileImage(MultipartFile image, String type) {
//        String originName = image.getOriginalFilename(); //원본 파일 이름
//        String ext = originName.substring(originName.lastIndexOf(".")); // 확장자
//        String changedName = changedImageName(originName); // 변경된 이름
//
//        ObjectMetadata metadata = new ObjectMetadata(); // 메타데이터
//        metadata.setContentType(ext);
//
//        try {
//            PutObjectResult putObjectRequest = amazonS3.putObject(new PutObjectRequest(
//                    bucket + "/" + type, changedName, image.getInputStream(), metadata)
//                    .withCannedAcl(CannedAccessControlList.PublicRead)
//            );
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//
//        String imageUrl = amazonS3.getUrl(bucket + "/" + type, changedName).toString();
//
//        return imageUrl;
//    }
//
//    public void deleteImageFromS3(String imageUrl, String type) {
//        if (imageUrl.contains("https://s3.ap-northeast-2.amazonaws.com/" + bucket))
//            amazonS3.deleteObject(bucket + "/" + type, imageUrl.split("/")[6]);
//    }
//
//    // 이미지 이름 변경
//    // 이미지 이름이 겹칠 경우 충돌이 발생하기 때문에 고유 난수를 uuid로 생성하여 originName과 합해준다.
//    private static String changedImageName(String originName) {
//        String random = UUID.randomUUID().toString();
//        return random + originName;
//    }
//}
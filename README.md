## 📂 delivery-app

### Expo 빌드, 배포 테스트

- [apk 빌드 완료](https://www.notion.so/hyungjinhan/Expo-Window-IOS-c9a32d8282b84d36909cf9ff98f3a763?pvs=4#41014ccbaefb483cb2db7104981ee2fd)

<br/>

## ~~📂 test~~

### ~~RTSP 영상 스트리밍 테스트~~

- ~~[`react-native-vlc-media-player`](https://github.com/razorRun/react-native-vlc-media-player)~~

<br/>

## 📂 video-test

### Expo 영상 출력

- [`expo-av`](https://docs.expo.dev/versions/latest/sdk/av/)

  - [`Video` Document](https://docs.expo.dev/versions/latest/sdk/video/#video)

  - [`m3u8` 확장자 활용](https://gist.github.com/lucky-c/91d96977f913d54f723b64c34ce03fac)

    - ios 환경에서는 재생 불가 ([`react-native-livestream` 활용](https://docs.api.video/docs/react-native-livestream-component))

### 스크린샷 테스트

- [`react-native-view-shot`](https://github.com/gre/react-native-view-shot)

  - [`captureRef` Document](https://docs.expo.dev/versions/latest/sdk/captureRef/#capturerefview-options)

### 가로 모드로 고정

- [`expo-screen-orientation`](https://docs.expo.dev/versions/latest/sdk/screen-orientation/)

  - [`orientationlock` Document](https://docs.expo.dev/versions/latest/sdk/screen-orientation/#screenorientationlockasyncorientationlock)

  - [`Video onFullscreenUpdate` Document](https://docs.expo.dev/versions/latest/sdk/video/#videofullscreenupdate)

### 푸쉬 알림 테스트

- [`expo-notifications` (알림 기능)](https://docs.expo.dev/versions/latest/sdk/notifications)

  - 특정 트리거 발동 시 알림 출력 가능

    - 물리적인 디바이스 환경에서만 알림을 위한 토큰이 생성되므로 에뮬레이터 환경에서는 테스트 불가

  - ~~[알림 아이콘 변경은 빌드를 통해 테스트가 가능할 것으로 보임](https://velog.io/@hhhminme/%EC%95%84%EC%A7%81%EB%8F%84-Push-Notification-%EC%9C%BC%EB%A1%9C-%EA%B3%A0%EC%83%9D%ED%95%98%EC%84%B8%EC%9A%94-Expo-Notification)~~

    - 테스트 결과, `app.json` 설정 후 빌드를 통해 아이콘 변경됨이 확인

  - [`expo-notifications` 알림 테스트 사이트](https://expo.dev/notifications)

<details>
  <summary>FCM 설정</summary>

1.  Firebase 프로젝트 생성

2.  프로젝트에 안드로이드 앱 추가

    <img src='./video-test/assets/firebase.png' width='50%'>

3.  해당 프로젝트의 안드로이드 패키지 이름과 동일하게 입력 및 앱 등록

    <img src='./video-test/assets/androidAdd.png' width='50%'>

4.  해당 `google-services.json` 파일을 다운로드 후, 안내에 따라 설정

    <img src='./video-test/assets/googleService.png' width='50%'>

5.  Firebase SDK 추가는 다음으로 넘어가기

6.  앱을 실행하여 설치 확인은 이 단계 건너뛰기로 넘어가기

7.  Firebase 프로젝트의 설정에서 클라우드 메시징 탭을 통해 `Cloud Messaging API` 서버 키 활용

    <img src='./video-test/assets/projectSetting.png' width='50%'>

    - 서버 키가 없다면 Google Cloud Service를 통해 `Cloud Messaging API` 사용 설정을 별도로 진행

8.  해당 프로젝트의 `app.json`에서 `google-services.json` 파일과 연동

    ```json
    "expo": {
      "android": {
        "package": "com.odndevel.videotest",
        "googleServicesFile": "./google-services.json",
      },
    }
    ```

9.  `expo push:android:upload --api-key <Cloud-Messaging-API-서버-키>` 터미널에 입력으로 FCM 토큰 값 입력

10. Expo 대쉬보드로 이동 후 `Credentials` 탭으로 이동하여 확인 가능

      <img src='./video-test/assets/expoCredentials.png' width='50%'>

</details>

<br/>

## 💡 기타 참고 사항

### [테스트용 비디오 모음 링크](https://gist.github.com/jsturgis/3b19447b304616f18657)

### Expo 환경에서 RTSP 영상 스트리밍은 불가

- `eject`를 진행한 후, react native 환경에서 가능

### Expo eject 후, 안드로이드 가상 디바이스 실행 에러 발생

- 원인, 설정법 찾아야 함

### `Toast` (`Alert` 대체제)

- [`react-native-toast-message` (Toast 알림)](https://github.com/calintamas/react-native-toast-message)

  - 느낌이 어떤지 테스트 할 예정

  - Alert은 가능, Confirm이 가능한지는 확인해봐야 함

- [`react-native-easy-toast` (다른 Toast 알림)](https://github.com/crazycodeboy/react-native-easy-toast)

  - Toast 커스텀이 비교적 쉬운 편 (ref를 이용)

  - 마찬가지로 Confirm이 가능한지는 확인해야 함

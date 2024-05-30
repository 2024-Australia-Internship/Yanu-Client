window.onload = () => {
	const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${window.env.KAKAO_MAP_JS_API}&autoload=false`;
   
    script.onload = () => {

      // 스크립트가 로드된 후에 kakao map 호출
    	kakao.maps.load(() => {
			const mapContainer = document.getElementById('map');
			const mapOption = {
				center: new kakao.maps.LatLng(33.450701, 126.570667),
				level: 3
			};

			// 지도 생성
			const map = new kakao.maps.Map(mapContainer, mapOption);
      });
    };

    // script 태그를 문서에 추가
    document.head.appendChild(script);
}
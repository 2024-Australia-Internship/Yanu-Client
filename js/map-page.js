window.onload = () => {
	const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${window.env.KAKAO_MAP_JS_API}&autoload=false`;
   
    script.onload = () => {

      // 스크립트가 로드된 후에 kakao map 호출
    	kakao.maps.load(() => {
			const mapContainer = document.getElementById('map');
			const mapOption = {
				center: new kakao.maps.LatLng(37.4668, 126.9326),
				level: 3
			};

			// 지도 생성
			const map = new kakao.maps.Map(mapContainer, mapOption);

			var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
						
			var positions = [
				{
					title: '카카오', 
					latlng: new kakao.maps.LatLng(33.450705, 126.570677)
				},
				{
					title: '생태연못', 
					latlng: new kakao.maps.LatLng(33.450936, 126.569477)
				},
				{
					title: '텃밭', 
					latlng: new kakao.maps.LatLng(33.450879, 126.569940)
				},
				{
					title: '근린공원',
					latlng: new kakao.maps.LatLng(33.451393, 126.570738)
				},
				{
					title: '미림마이스터고',
					latlng: new kakao.maps.LatLng(37.4668, 126.9326)
				}
			];

			for (var i = 0; i < positions.length; i ++) {
    
				// 마커 이미지의 이미지 크기 입니다
				var imageSize = new kakao.maps.Size(24, 35); 
				
				// 마커 이미지를 생성합니다    
				var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
				
				// 마커를 생성합니다
				var marker = new kakao.maps.Marker({
					map: map, // 마커를 표시할 지도
					position: positions[i].latlng, // 마커를 표시할 위치
					title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
					image : markerImage // 마커 이미지 
				});
			}
      	});
    };

    // script 태그를 문서에 추가
    document.head.appendChild(script);
}
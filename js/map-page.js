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
						
			var imageSrc = '../images/marker.svg', // 마커이미지의 주소입니다    
				imageSize = new kakao.maps.Size(127, 127), // 마커이미지의 크기입니다
				imageOption = {offset: new kakao.maps.Point(63, 63)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      
			var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
				markerPosition = new kakao.maps.LatLng(37.4668, 126.9326);

			// 마커를 생성합니다
			var marker = new kakao.maps.Marker({
				position: markerPosition, 
				image: markerImage // 마커이미지 설정 
			});

			// 마커가 지도 위에 표시되도록 설정합니다
			marker.setMap(map);

			var positions = [
				{
					title: 'Owen\' farm',
					star: 4, 
					farm_id: 1,
					latlng: new kakao.maps.LatLng(33.450705, 126.570677),
					sub_overlay: null
				},
				{
					title: '생태연못', 
					star: 3,
					farm_id: 2,
					latlng: new kakao.maps.LatLng(33.450936, 126.569477),
					sub_overlay: null
				},
				{
					title: '텃밭', 
					star: 1,
					farm_id: 3,
					latlng: new kakao.maps.LatLng(33.450879, 126.569940),
					sub_overlay: null
				},
				{
					title: '근린공원',
					star: 5,
					farm_id: 4,
					latlng: new kakao.maps.LatLng(33.451393, 126.570738),
					sub_overlay: null
				},
				{
					title: 'Owen\'s farm',
					star: 2,
					farm_id: 5,
					latlng: new kakao.maps.LatLng(37.4655, 126.9330),
					sub_overlay: null,
					show: false
				}
			];

			positions.forEach((position, index) => {
				let box = document.createElement('div');
				box.className = 'overlay-box'

				let content = document.createElement('div');
				content.className = "overlay";

				let farmName = document.createElement('div');
				farmName.className = 'farm-name'
				farmName.innerText = position.title;

				let farmInfo = document.createElement('div');
				farmInfo.className = 'farm-info';

				let starBox = document.createElement('div');
				starBox.className = 'star-box';

				let starIcon = document.createElement('iconify-icon');
				starIcon.className = 'star-icon';
				starIcon.icon = 'ph:star-fill';

				let starRating = document.createElement('div');
				starRating.className = 'star-rating';
				starRating.innerText = position.star;

				starBox.appendChild(starIcon);
				starBox.appendChild(starRating);

				let distance = document.createElement('div');
				distance.className = 'distance';
				distance.innerText = '200m';

				farmInfo.appendChild(starBox);
				farmInfo.appendChild(distance);

				content.appendChild(farmName)
				content.appendChild(farmInfo)

				let subContent = document.createElement('div');
				subContent.className = 'sub-overlay';
				subContent.classList.add('sub-overlay');
				subContent.classList.add('hide-overlay');

				let farmTitle = document.createElement('div');
				farmTitle.className = 'farm-title';

				let div = document.createElement('div');

				let subFarmName = document.createElement('div');
				subFarmName.className = 'farm-name';
				subFarmName.innerText = position.title;

				let subFarmInfo = document.createElement('div');
				subFarmInfo.className = 'sub-farm-info'

				let subStarBox = document.createElement('star-box');
				subStarBox.className = 'star-box';

				let subStarIcon = document.createElement('iconify-icon');
				subStarIcon.className = 'star-icon'
				subStarIcon.icon = 'ph:star-fill';

				let subStarRating = document.createElement('div');
				subStarRating.className = 'star-rating';
				starRating.innerText = position.star;

				subStarBox.appendChild(subStarIcon);
				subStarBox.appendChild(subStarRating);

				let subDistance = document.createElement('div');
				subDistance.className = 'distance';
				subDistance.innerText = '200m';

				subFarmInfo.appendChild(subStarBox);
				subFarmInfo.appendChild(subDistance);

				div.appendChild(subFarmName);
				div.appendChild(subFarmInfo);

				let arrowIcon = document.createElement('iconify-icon');
				arrowIcon.className = 'arrow-icon';
				arrowIcon.icon = 'iconamoon:arrow-up-2-thin';

				farmTitle.appendChild(div)
				farmTitle.appendChild(arrowIcon)

				let farmImgBox = document.createElement('div');
				farmImgBox.className = 'farm-img-box';

				let farmImg = document.createElement('img');
				farmImg.className = 'farm-img';
				farmImg.src = '../images/farmer-registration-back-img.svg';

				farmImgBox.appendChild(farmImg);

				subContent.appendChild(farmTitle)
				subContent.appendChild(farmImgBox)

				box.appendChild(subContent);
				box.appendChild(content);

				arrowIcon.onclick = () => {
					window.location.href = `/html/farmer-page.html?user_code=9&farm_code=${farm_id}`
				}

				// 커스텀 오버레이 생성
				var customOverlay  = new kakao.maps.CustomOverlay({
					position: position.latlng,
					content: box,
					xAnchor: 0.5,
    				yAnchor: 0.20
				});
				
				customOverlay.setMap(map);
				
				content.onclick = () => {
					subContent.classList.toggle('hide-overlay')
				}

			})
      	});
    };

    // script 태그를 문서에 추가
    document.head.appendChild(script);
}


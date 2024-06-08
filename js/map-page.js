const listMap = document.getElementsByClassName('list-map')[0];

window.onload = () => {
	const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${window.env.KAKAO_MAP_JS_API}&autoload=false`;

    script.onload = () => {
		const markerX = 37.4668;
		const markerY = 126.9326;

      // 스크립트가 로드된 후에 kakao map 호출
    	kakao.maps.load(async() => {
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
				markerPosition = new kakao.maps.LatLng(markerX, markerY);

			// 마커를 생성합니다
			var marker = new kakao.maps.Marker({
				position: markerPosition, 
				image: markerImage // 마커이미지 설정 
			});

			// 마커가 지도 위에 표시되도록 설정합니다
			marker.setMap(map);

			const config = {
				headers: {
					'Content-type': 'application/json;charset=UTF-8',
					'Authorization': `KakaoAK ${window.env.KAKAO_MAP_REST_API}`
				}
			}

			const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/transcoord?x=${markerX}&y=${markerY}&output_coord=WTM`, config);

			const x1 = response.data.documents[0].x;
			const y1 = response.data.documents[0].y;

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
					latlng: new kakao.maps.LatLng(37.4952, 126.9569),
					sub_overlay: null,
					show: false
				}
			];

			positions.forEach(async(position, index) => {
				try{
					const x = position.latlng.getLat();
					const y = position.latlng.getLng();

					const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/transcoord?x=${x}&y=${y}&output_coord=WTM`, config);

					const x2 = response.data.documents[0].x;
					const y2 = response.data.documents[0].y;

					const myDistance = getDistance(x1, y1, x2, y2);
					console.log(myDistance);

					let box = document.createElement('div');
					box.className = 'overlay-box'

					let content = document.createElement('div');
					content.className = "overlay";

					let farmName = document.createElement('div');
					farmName.className = 'overlay-farm-name'
					farmName.innerText = position.title;

					let farmInfo = document.createElement('div');
					farmInfo.className = 'overlay-farm-info';

					let starBox = document.createElement('div');
					starBox.className = 'overlay-star-box';

					let starIcon = document.createElement('iconify-icon');
					starIcon.className = 'overlay-star-icon';
					starIcon.icon = 'ph:star-fill';

					let starRating = document.createElement('div');
					starRating.className = 'overlay-star-rating';
					starRating.innerText = position.star;

					starBox.appendChild(starIcon);
					starBox.appendChild(starRating);

					let distance = document.createElement('div');
					distance.className = 'overlay-distance';
					distance.innerText = `${myDistance}m`;

					farmInfo.appendChild(starBox);
					farmInfo.appendChild(distance);

					content.appendChild(farmName)
					content.appendChild(farmInfo)

					let subContent = document.createElement('div');
					subContent.className = 'sub-overlay';
					subContent.classList.add('sub-overlay');
					subContent.classList.add('hide-overlay');

					let farmTitle = document.createElement('div');
					farmTitle.className = 'overlay-farm-title';

					let div = document.createElement('div');

					let subFarmName = document.createElement('div');
					subFarmName.className = 'overlay-farm-name';
					subFarmName.innerText = position.title;

					let subFarmInfo = document.createElement('div');
					subFarmInfo.className = 'overlay-sub-farm-info'

					let subStarBox = document.createElement('star-box');
					subStarBox.className = 'overlay-star-box';

					let subStarIcon = document.createElement('iconify-icon');
					subStarIcon.className = 'overlay-star-icon'
					subStarIcon.icon = 'ph:star-fill';

					let subStarRating = document.createElement('div');
					subStarRating.className = 'overlay-star-rating';
					starRating.innerText = position.star;

					subStarBox.appendChild(subStarIcon);
					subStarBox.appendChild(subStarRating);

					let subDistance = document.createElement('div');
					subDistance.className = 'overlay-distance';
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
					farmImgBox.className = 'overlay-farm-img-box';

					let farmImg = document.createElement('img');
					farmImg.className = 'overlay-farm-img';
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
				}catch(error){
					console.error(error);
				}
			})
      	});
    };

    // script 태그를 문서에 추가
    document.head.appendChild(script);
}

const inputMap = document.getElementsByClassName('input-map')[0];
const inputList = document.getElementsByClassName('input-list')[0];

inputMap.onkeydown = e => {
	if(e.keyCode === 13){
		findFarm('input-map')
	}
}

inputList.onkeydown = e => {
	if(e.keyCode === 13){
		findFarm('input-list')
	}
}

async function findFarm(input){
	let farm = document.getElementsByClassName(input)[0].value;
	console.log(farm);
	console.log(listMap.classList.contains('hide-list'))

	if(listMap.classList.contains('hide-list')){ // list가 아래로 내려가있을때
		listMap.classList.remove('hide-list')
	}

	try{
		const response = await axios.get(`${BASE_URL}/searches/farms/${farm}`, config);
		console.log(response.data);
		showFarmList(response.data)

	}catch(err){
		console.error(err);
	}
}


function showList() {
	listMap.classList.toggle('hide-list')
}

function getDistance(x1, y1, x2, y2) {
	return Math.round(Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2));
}

function showFarmList(farms) {
	const farmList = document.getElementsByClassName('farm-list')[0];

	farms.forEach(farm => {
		let farmBox = document.createElement('div');
		farmBox.className = 'farm-box';

		let farmImgBox = document.createElement('div');
		farmImgBox.className = 'farm-img-box';

		let farmImg = document.createElement('img');
		farmImg.className = 'farm-img';
		farmImg.src = '../images/farmer-registration-back-img.svg';

		let heart = document.createElement('iconify-icon');
		heart.className = 'heart';
		heart.icon = 'ph:heart';

		farmImgBox.appendChild(farmImg)
		farmImgBox.appendChild(heart)

		let farmTitle = document.createElement('div');
		farmTitle.className = 'farm-title';

		let farmName = document.createElement('div');
		farmName.className = 'farm-name';
		farmName.innerText = farm.businessName

		let starRating = document.createElement('div');
		starRating.className = 'star-rating';
		
		let starIcon = document.createElement('iconify-icon');
		starIcon.className = 'star-icon';
		starIcon.icon = 'ph:star-fill';

		let star = document.createElement('div');
		star.className = 'star';
		star.innerText = '5';

		starRating.appendChild(starIcon)
		starRating.appendChild(star)

		farmTitle.appendChild(farmName)
		farmTitle.appendChild(starRating)

		let farmerName = document.createElement('div');
		farmerName.className = 'farmer-name';
		farmerName.innerText = farm.farmName;

		let farmInfo = document.createElement('div');
		farmInfo.className = 'farm-info';
		
		let distance = document.createElement('div');
		distance.className = 'distance';
		distance.innerText = '200m';

		let products = document.createElement('div');
		products.className = 'products'
		products.innerText = '11 products';

		let reviews = document.createElement('div');
		reviews.className = 'reviews';
		reviews.innerText = '12 reviews';

		farmInfo.appendChild(distance)
		farmInfo.appendChild(products)
		farmInfo.appendChild(reviews)

		farmBox.appendChild(farmImgBox)
		farmBox.appendChild(farmTitle)
		farmBox.appendChild(farmerName)
		farmBox.appendChild(farmInfo)

		farmList.appendChild(farmBox);
	})
}


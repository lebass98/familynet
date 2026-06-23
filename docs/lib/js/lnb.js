jQuery(function ($) {
    // LNB 기능 구현 (클릭 토글 방식 + 암막 백드롭)
    $(function () {
        var $header = $('#header');
        var $lnb = $('.lnb');
        var $lnbItems = $lnb.find('> ul > li');
        var $lnbLinks = $lnbItems.find('> a');
        var $lnbBg = $('.lnb_bg');

        // 백드롭 동적 생성
        if ($('.lnb-backdrop').length === 0) {
            $('body').append('<div class="lnb-backdrop"></div>');
        }
        var $backdrop = $('.lnb-backdrop');

        // 초기 상태: 모든 서브메뉴 숨김
        $lnbItems.find('.lnb_sub').hide();

        // 메인 메뉴 클릭 이벤트
        $lnbLinks.on('click', function (e) {
            // 모든 클릭 이벤트 전파 및 기본 동작 중단 (페이지 이동 확실히 차단)
            e.preventDefault();
            e.stopPropagation();

            var $parentLi = $(this).parent('li');
            var $targetSub = $parentLi.find('.lnb_sub');
            var isActive = $parentLi.hasClass('active');

            if (isActive) {
                // 이미 열려있는 메뉴를 클릭하면 닫기
                closeAllMenus();
            } else {
                // 다른 메뉴들 닫기
                $lnbItems.removeClass('active');
                $lnbItems.find('.lnb_sub').hide();

                // 현재 클릭한 메뉴 열기
                $parentLi.addClass('active');
                $targetSub.show();

                // 백드롭 및 배경 표시
                $lnbBg.show();
                $backdrop.fadeIn(200);

                // 상단 고정 및 메뉴 영역 확보를 위한 클래스
                $header.addClass('menu-opened');
                
                // 메가메뉴 형태 유지를 위해 lnb 높이 조정
                $lnb.css('height', '414px'); 
            }
            
            return false; // jQuery 레벨에서 한 번 더 차단
        });

        // 서브메뉴 내부 링크 효과
        $lnbItems.find('.lnb_sub ul li a').on('mouseover focus', function () {
            $(this).closest('.lnb_sub').find('li').removeClass('active');
            $(this).parent('li').addClass('active');
        });

        // 백드롭 클릭 시 모두 닫기
        $backdrop.on('click', function () {
            closeAllMenus();
        });

        // ESC 키 누를 때 닫기
        $(window).on('keydown', function(e) {
            if (e.keyCode === 27) { // ESC
                closeAllMenus();
            }
        });

        // 공통 메뉴 닫기 함수
        function closeAllMenus() {
            $lnbItems.removeClass('active');
            $lnbItems.find('.lnb_sub').hide();
            $lnbBg.hide();
            $backdrop.fadeOut(200);
            $header.removeClass('menu-opened');
            $lnb.css('height', '64px'); // 기본 높이로 복구
        }
    });
});

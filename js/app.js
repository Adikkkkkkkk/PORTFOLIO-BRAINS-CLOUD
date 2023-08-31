$(function () {
	$(document).ready($('body').removeClass('no-scroll'))
	const workSlider = $('[data-slider="slick"]')
	// FILTER ================================
	// переменная всех элементов с атрибутом data-filter
	let filter = $('[data-filter]')

	// действие при нажатии
	filter.on('click', function (event) {
		// убираем дефолтную работу ссылок
		event.preventDefault()

		// переменная со значениями data-filter
		let cat = $(this).data('filter')

		if (cat == 'all') {
			$('[data-cat]').removeClass('hide')
		} else {
			$('[data-cat]').each(function () {
				let workCat = $(this).data('cat')

				if (workCat != cat) {
					$(this).addClass('hide')
				} else {
					$(this).removeClass('hide')
				}
			})
		}
	})

	// MODAL ================================

	// записываем в переменную эл-ты с атрибутом data-modal
	const modalCall = $('[data-modal]')
	const modalClose = $('[data-close]')

	modalCall.on('click', function (event) {
		event.preventDefault()
		let $this = $(this)
		let modalId = $this.data('modal')

		$(modalId).addClass('show')
		$('body').addClass('no-scroll')

		setTimeout(function () {
			$(modalId).find('.modal__dialog').css({
				transform: 'rotateX(0)',
			})
		}, 100)

		workSlider.slick('setPosition')
	})

	modalClose.on('click', function (event) {
		event.preventDefault()
		let $this = $(this)
		let modalParents = $this.parents('.modal')

		modalParents.find('.modal__dialog').css({
			transform: 'rotateX(90deg)',
		})

		setTimeout(function () {
			modalParents.removeClass('show')
			$('body').removeClass('no-scroll')
		}, 200)
	})

	// Нажатие на маску модального окна modal
	$('.modal').on('click', function (event) {
		let $this = $(this)

		$this.find('.modal__dialog').css({
			transform: 'rotateX(90deg)',
		})

		setTimeout(function () {
			$this.removeClass('show')
			$('body').removeClass('no-scroll')
		}, 200)
	})
	// Отмена закрытия при нажатии на модальное окно modal__dialog
	$('.modal__dialog').on('click', function (event) {
		event.stopPropagation()
	})

	// SLIDER: https://kenwheeler.github.io/slick ==========

	workSlider.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		arrows: false,
		dots: true,
	})

	$('.slickPrev').on('click', function (event) {
		event.preventDefault()

		let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]')

		currentSlider.slick('slickPrev')
	})

	$('.slickNext').on('click', function (event) {
		event.preventDefault()

		let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]')

		currentSlider.slick('slickNext')
	})
})

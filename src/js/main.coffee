$ ->
  $('a[href^="#"]').on 'click', (e) ->
    e.preventDefault()
    target = @hash
    $target = $(target)
    $('html, body').stop().animate { 'scrollTop': $target.offset().top }, 900, 'swing'
    return

  $(window).scroll ->
    if $(this).scrollTop() > 300 then $('#back_to_top').fadeIn(900) else $('#back_to_top').fadeOut(100)
    return

  $('#mail_form').on 'submit', (e)->
    if !validForm(this)
      return false

    e.preventDefault()

    $.ajax({
        url: '/mail.php',
        context: $('#contacto'),
        method: 'POST',
        data: $(this).serialize()
      }).done (data) ->
        $('#mail_form').hide()
        $('#done').fadeIn()
        return
    return

validForm = (form) ->
  $form = $(form)
  emptyFields = false
  $form.find(':input.required').each ->
    $this = $(this)
    if $this.val() == ''
      $this.addClass('wrong')
      emptyFields = true
    else
      $this.removeClass('wrong')
  if emptyFields then $('#error-messages').fadeIn(500) else $('#error-messages').hide(0)
  !emptyFields

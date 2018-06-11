'use strict';

let articleView = {};

articleView.populateFilters = () => {
  $('article').each(function () {
    if (!$(this).hasClass('template')) {
      let val = $(this).find('address a').text();
      let optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = () => {
  $('#author-filter').on('change', function () {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = () => {
  $('#category-filter').on('change', function () {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};
//may need new
articleView.handleMainNav = () => {
  $('nav').on('click', '.tab', function (e) {
    e.preventDefault();
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).fadeIn();
  });

  $('nav .tab:first').click();
};

articleView.setTeasers = () => {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function (e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      }, 200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

// COMMENT: DONE: Where is this function called? Why?
// Response: This function is called in index.html and will be invoked when there are changes to any of the eleents in the form. It has the event handler to update the preview and the export field.
articleView.initNewArticlePage = () => {

  // DONE? TODO: The new articles we create will be copy/pasted into our source data file.
  // Set up this "export" functionality. We can hide it for now, and show it once we have data to export.

  $('#article-json').on('focus', function () {
    this.select();
  });

  // DONE TODO: Add an event handler to update the preview and the export field if any inputs change.
  //*callback doesnt need () at end
  $('#new-form').on('change', articleView.create);
};

articleView.create = () => {
  // DONE! TODO: Set up a variable to hold the new article we are creating.
  let article;
  //DONE! TODO clear out #articles el, so we can update preview
  $('#articles').empty();
  // DONE! TODO: Instantiate an article based on what's in the form fields:
  article = new Article({
    title: $('#article-title').val(),
    author: $('#article-author').val(),
    category: $('#article-category').val(),
    authorUrl: $('#article-author-url').val(),
    publishedOn: $('#article-published').val(),
    body: $('#article-body').val()
  });
  console.log(article);
  // DONE! TODO: Use our interface to the Handblebars template to put this new article into the DOM:
  $('#articles').append(article.toHtml())

  // DONE! for real this time! TODO: Activate the highlighting of any code blocks; look at the documentation for hljs to see how to do this by placing a callback function in the .each():

  $('pre code').each(function (i, block) {
    hljs.highlightBlock(block);
  })

  // DONE! TODO: Show our export field, and export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
  $('#article-json').val(JSON.stringify(article));

};

// COMMENT: Where is this function called? Why?
// PUT YOUR RESPONSE HERE
//response:: This function is called on index.html so we can view andinteract with each article.
articleView.initIndexPage = () => {
  articles.forEach(article => $('#articles').append(article.toHtml()));
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};

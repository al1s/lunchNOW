'use strict';

function Recipe(rawDataObj) {
  Object.keys(rawDataObj).forEach(key => {
    this[key] = rawDataObj[key];
  }, this);
}

Recipe.all = [];

Recipe.prototype.toHtml = function() {
  var template = Handlebars.compile($('#recipe-template').text());

  this.daysAgo = parseInt(
    (new Date() - new Date(this.published_on)) / 60 / 60 / 24 / 1000
  );
  this.publishStatus = this.published_on
    ? `published ${this.daysAgo} days ago`
    : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

Recipe.loadAll = recipeData => {
  recipeData.sort(
    (a, b) => new Date(b.published_on) - new Date(a.published_on)
  );

  recipeData.forEach(recipeObject =>
    recipe.all.push(new recipe(articleObject))
  );
};

Recipe.fetchAll = callback => {
  $.get('/recipes').then(results => {
    recipe.loadAll(results);
    callback();
  });
};

Recipe.truncateTable = callback => {
  $.ajax({
    url: '/recipes',
    method: 'DELETE'
  }).then(data => {
    console.log(data);
    if (callback) callback();
  });
};

Recipe.prototype.insertRecord = function(callback) {
  $.post('/recipes', {
    author: this.author,
    author_url: this.author_url,
    body: this.body,
    category: this.category,
    published_on: this.published_on,
    title: this.title
  }).then(data => {
    console.log(data);
    if (callback) callback();
  });
};

Recipe.prototype.deleteRecord = function(callback) {
  $.ajax({
    url: `/recipes/${this.recipe_id}`,
    method: 'DELETE'
  }).then(data => {
    console.log(data);
    if (callback) callback();
  });
};

Recipe.prototype.updateRecord = function(callback) {
  $.ajax({
    url: `/recipes/${this.recipe_id}`,
    method: 'PUT',
    data: {
      author: this.author,
      author_url: this.author_url,
      body: this.body,
      category: this.category,
      published_on: this.published_on,
      title: this.title,
      author_id: this.author_id
    }
  }).then(data => {
    console.log(data);
    if (callback) callback();
  });
};

let addToFavorites = function(event) {
  $.ajax({
    url: `/recipes`,
    method: 'POST',
    data: {
      recipe_id: this.id
    }
  }).then((resp, status, xhr) => {
    console.log(xhr);
  });
};

$('form').on('click', addToFavorites);
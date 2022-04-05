<<<<<<< HEAD
const conectionJson = () =>{
  //Cargar los datos al momento de cargar la pagina
  document.addEventListener('DOMContentLoaded', upDates())

  async function upDates(){
    fetch('\DACCT\JSON\blog_extension.json')
    .then(res, (res)=>{
      console.log(res)
    })





  }




};






=======
// declaracion de elementos (input y container)
>>>>>>> e632994f238f027edaf27de0a86b77d12ff09405

const searchBar = document.getElementById('searchBar');

const containerList = document.getElementById('containerList');

// eliminarDiacriticosEs

function removeAccents(texto) {
	return texto
		.normalize('NFD')
		.replace(
			/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
			'$1'
		)
		.normalize();
}

// filtro de busqueda

let articles;

const filterSearch = () => {
	// declaracion de elementos
	let valueLowerCase = searchBar.value.toLowerCase(); //toma el valor el input y lo pasa a minuscula
	const text = removeAccents(valueLowerCase);

	const list = document.createElement('ul');
	list.classList.add('list-blog');

	// busqueda de articulos
	for (const article of articles) {
		const title = removeAccents(article.title.toLowerCase());

		if (title.includes(text)) {
			// crecion de elementos
			const item = document.createElement('li');
			item.classList.add('list-blog--item');

			const link = document.createElement('a');
			link.classList.add('list-blog--item-title');

			link.textContent = article.title;
			link.title = 'Abrir artículo';
			link.href = article.link;
			link.target = '_blank';

			const date = document.createElement('time');
			date.classList.add('list-blog--item-time');

			date.textContent = article.visual_date;
			date.dateTime = article.date;

			item.append(link, date);
			// esto con la finalidad de insertar una vez en el doom
			list.append(item);
		}
	}

	// Insercion de elementos en el DOM con metodologia fragment
	if (containerList.children.length > 0)
		containerList.removeChild(containerList.children[0]);

	// aplicar estilos de invalid a barra de busqueda
	searchBar.classList.toggle('search-bar__invalid', list.children.length === 0);

	if (list.children.length === 0) {
		// en caso de que no ninguna key coinsida
		const item = document.createElement('li');
		item.textContent = 'Articulo no encontrado...';
		item.classList.add('list-blog--item__undefined');
		// agregar alerta en lista
		list.append(item);

		containerList.append(list);
	} else containerList.append(list);
};

// Extraccion de articulos de API JSON con AJAX

const fetchArticles = async (lang) => {
	if (lang) {
		articles = await fetch(
			`https://kanutegx.github.io/DACCT/JSON/register_blog/${lang}.json`
		)
			.then((res) => res.json())
			.then((res) => res.articles);
	} else {
		articles = await fetch(
			`https://kanutegx.github.io/DACCT/JSON/register_blog/en.json`
		)
			.then((res) => res.json())
			.then((res) => res.articles);
	}

	searchBar.addEventListener('keyup', filterSearch);

	filterSearch();
};

fetchArticles(localStorage.getItem('lang'));

// click event de lang

languageContainer.addEventListener('click', (e) => {
	const language = e.target.dataset.lang;

<<<<<<< HEAD
filterSearch();



// Funcion para cargar la informacion 

=======
	if (language != undefined) {
		// limpiar evento para que no se sobre sature al cambiar el idioma
		searchBar.removeEventListener('keyup', filterSearch);
		fetchArticles(language);
	}
});
>>>>>>> e632994f238f027edaf27de0a86b77d12ff09405

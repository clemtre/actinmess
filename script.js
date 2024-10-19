const aside = document.querySelector('aside')
const body = document.querySelector('body')
const nav = document.querySelector('nav')
const section = document.querySelector('section')

const etoile = () => {
aside.innerHTML = ''
for(let i = 0 ; i < 3 ; i ++){
		let baton = document.createElement('span')
		baton.style.width = '5px'
		baton.style.height = `${Math.random() * 100+80}px`
		baton.style.transform = `rotate(${Math.random() * 360}deg)`
		baton.style.background = 'black'
		aside.appendChild(baton)
	}
}

toggleNav = () => {
	nav.classList.toggle('show-nav')
	etoile()
}

aside.addEventListener("click", toggleNav);
etoile()
let scroll = 0;
let isScrolling = 1;
console.log(section)
section.addEventListener("mouseover", function(){
	isScrolling = 0;
	console.log('scroll')
});
let scrollInterval = setInterval(function () {
section.scrollLeft = scroll
scroll += 1
isScrolling ? '' : clearInterval(scrollInterval);
}, 50); 




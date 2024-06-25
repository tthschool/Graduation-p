let country = "jp"
const news   = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=26ecb3d51db748089fd69d3167a45938`);
const response =await news.json()
console.log(response);
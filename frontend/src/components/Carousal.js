import React from 'react'

export default function Carousal() {
  return (
    <div>
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: 'contain !important'}}>
  <div class="carousel-inner" id= 'carousel'>
    <div class= 'carousel-caption' style= {{zIndex: 10}}>
    <form class="d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success text-white" type="submit">Search</button>
    </form>
    </div>
    <div class="carousel-item active">
      <img src="https://th.bing.com/th/id/OIP.Ntq3__ayEIFAZok5kIuO3wHaE9?pid=ImgDet&rs=1" style= {{filter: 'brightness(30%)'}} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://th.bing.com/th/id/OIP.blrlhxb-u9YWzIJw_jE0zgHaE8?pid=ImgDet&rs=1" style= {{filter: 'brightness(30%)'}} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://th.bing.com/th/id/OIP.n9pG4Aaemr8D7CcTo8fv4gHaEK?pid=ImgDet&rs=1" style= {{filter: 'brightness(30%)'}} class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

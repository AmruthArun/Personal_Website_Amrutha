/**
* Template Name: Laura
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/laura-free-creative-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let galleryContainer = select('.gallery-container');
    if (galleryContainer) {
      let galleryIsotope = new Isotope(galleryContainer, {
        itemSelector: '.gallery-item'
      });

      let galleryFilters = select('#gallery-flters li', true);

      on('click', '#gallery-flters li', function (e) {
        e.preventDefault();
        galleryFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        galleryIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Gallery details slider
   */
  new Swiper('.gallery-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();




})()

function validateForm(event) {
  event.preventDefault(); // Prevent form submission

  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var subject = document.getElementById("subject");
  var message = document.getElementById("message");

  // Reset error messages
  name.setCustomValidity("");
  email.setCustomValidity("");
  subject.setCustomValidity("");
  message.setCustomValidity("");

  if (!name.checkValidity()) {
    name.setCustomValidity("Please enter your name.");
  }

  if (!email.checkValidity()) {
    email.setCustomValidity("Please enter a valid email address.");
  }

  if (!subject.checkValidity()) {
    subject.setCustomValidity("Please enter a message.");
  }

  if (!message.checkValidity()) {
    message.setCustomValidity("Please enter a message.");
  }

  // Display error messages
  name.reportValidity();
  email.reportValidity();
  message.reportValidity();

  // If all fields are valid, you can submit the form
  if (name.checkValidity() && email.checkValidity() && message.checkValidity()) {
    document.getElementById("contactForm").submit();


  }
}


$().ready(function () {

  $("#contactForm").validate({
    rules: {
      name: {
        required: true,
        minlength: 4
      },
      email: {
        required: true,
        minlength: 10
        // type:email
      },
      subject: {
        required: true,

      },
      message: {
        required: true,
        rangelength: [10, 250],
      },
    },
    message: {
      name: {
        required: "Enter the Name",
        minlength: "Enter atleast 4 characters",
        
      },
      email: {
        required: "Enter the Email Address",
        email: "Enter a valid email address",
      },
      subject: {
        required: "Enter the Subject",
      },
      message: {
        required: "Enter the Message",
        rangelength: "Enter a message between 10 and 250 characters",

      },
    }

  });
});


//Capture the event only from form
// $( "#contactForm" ).on( "submit", function( event ) {
//   // alert( "Handler for `submit` called." );
  
//   event.preventDefault();
// });


// // *****************Method 1*******************

// // Function to convert form data to JSON
// function formToJson(form) {
//   const formData = new FormData(form);
//   const jsonObject = {};

//   for (const [key, value] of formData.entries()) {
//     jsonObject[key] = value;
//   }

//   return jsonObject;
// }

// // Function to download JSON as .xls file
// function downloadExcel(jsonData) {
//   const filename = 'form_data.xls';
//   const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(jsonData));

//   const downloadAnchor = document.createElement('a');
//   downloadAnchor.setAttribute('href', dataStr);
//   downloadAnchor.setAttribute('download', filename);
//   document.body.appendChild(downloadAnchor);
//   downloadAnchor.click();
//   document.body.removeChild(downloadAnchor);
// }

// // Event listener for form submission
// document.getElementById('contactForm').addEventListener('submit', function(e) {
//   e.preventDefault();
//   const formData = formToJson(this);
//   downloadExcel(formData);
// });



// // ************************method2 2*****************************

// // Function to convert form data to an array of arrays (Excel format)
// function formToExcelData(form) {
//   const formData = new FormData(form);
//   const excelData = [];

//   for (const [key, value] of formData.entries()) {
//     excelData.push([key, value]);
//   }

//   return excelData;
// }

// // Function to download Excel file
// function downloadExcel(excelData) {
//   const worksheet = XLSX.utils.aoa_to_sheet(excelData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Form Data");
//   const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

//   const filename = 'form_data.xlsx';
//   const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

//   if (navigator.msSaveBlob) {
//     // For IE 10+
//     navigator.msSaveBlob(blob, filename);
//   } else {
//     // For other browsers
//     const downloadAnchor = document.createElement('a');
//     const url = URL.createObjectURL(blob);

//     downloadAnchor.setAttribute('href', url);
//     downloadAnchor.setAttribute('download', filename);
//     downloadAnchor.style.display = 'none';
//     document.body.appendChild(downloadAnchor);
//     downloadAnchor.click();
//     document.body.removeChild(downloadAnchor);

//     // Release the object URL
//     URL.revokeObjectURL(url);
//   }
// }

// // Event listener for form submission
// document.getElementById('contactForm').addEventListener('submit', function(e) {
//   e.preventDefault();
//   const excelData = formToExcelData(this);
//   downloadExcel(excelData);
// });



// // ************************method 3 google forms*****************************

$("#contactForm").submit((e)=>{
  e.preventDefault()
  $.ajax({
      url:"https://script.google.com/macros/s/AKfycbyAfrpA58jD5zF5qIqRCOH9EnpN_3UiDBQQJKTjSZYTzqxLnPicEKGRBR_fFm7_Fg_B/exec",
      data:$("#contactForm").serialize(),
      method:"post",
      success:function (response){
          alert("Form submitted successfully")
          window.location.reload()
          //window.location.href="https://google.com"
      },
      error:function (err){
          alert("Something Error")

      }
  })
})
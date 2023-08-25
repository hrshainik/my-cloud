document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.querySelector(".body");
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggleBtn = document.querySelector(".sidebar__toggle");
  const addMoreSpaceBtn = document.querySelector(".sidebar__lower--addspace");
  const navbarSearch = document.querySelector(".navbar__search");
  const selectedAll = document.querySelectorAll(".dropdown-toggle");
  const menuToggleBtn = document.querySelector("#nav-toggle");
  const menuToggleCheckobx = document.querySelector(".nav-checkbox");
  const navbarRightSide = document.querySelector(".navbar__right");
  const searchCrossBtn = document.querySelector(".navbar__search--cross");
  const slider = document.querySelector(".folders-container");

  sidebarToggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("narrow-sidebar");
    mainContent.classList.toggle("wide-body");

    if (sidebar.classList.contains("narrow-sidebar")) {
      addMoreSpaceBtn.innerHTML = `
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><defs><style>.cls-1{fill-rule:evenodd}</style></defs><path class="cls-1" d="M.5 8.5v-1h15v1z"/><path class="cls-1" d="M8.5 15.5h-1V.5h1z"/></svg>
        `;

      sidebarToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path
          d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
        />
      </svg>
        `;
    } else {
      addMoreSpaceBtn.innerHTML = "Add More Space";

      sidebarToggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path
        d="M16.707 4.707 9.414 12l7.293 7.293-1.414 1.414L6.586 12l8.707-8.707 1.414 1.414z"
      />
  </svg>
      `;
    }

    if (sidebar.classList.contains("nav-active")) {
      sidebar.classList.remove("nav-active");
    }
  });

  selectedAll.forEach((selected) => {
    const optionsContainer = selected.children[2];
    const optionsList = selected.querySelectorAll("div.dropdown-toggle li");

    selected.addEventListener("click", () => {
      let arrow = selected.children[1];

      if (selected.classList.contains("active")) {
        handleDropdown(selected, arrow, false);
      } else {
        let currentActive = document.querySelector(".dropdown-toggle.active");

        if (currentActive) {
          let anotherArrow = currentActive.children[1];
          handleDropdown(currentActive, anotherArrow, false);
        }

        handleDropdown(selected, arrow, true);
      }
    });

    // update the display of the dropdown
    for (let o of optionsList) {
      o.addEventListener("click", () => {
        selected.querySelector(".selected-display").innerHTML = o.innerHTML;
      });
    }
  });

  // check if anything else ofther than the dropdown is clicked
  window.addEventListener("click", function (e) {
    if (e.target.closest(".dropdown-toggle") === null) {
      closeAllDropdowns();
    }
  });

  // close all the dropdowns
  function closeAllDropdowns() {
    const selectedAll = document.querySelectorAll(".dropdown-toggle");
    selectedAll.forEach((selected) => {
      const optionsContainer = selected.children[2];
      let arrow = selected.children[1];

      handleDropdown(selected, arrow, false);
    });
  }

  // open all the dropdowns
  function handleDropdown(dropdown, arrow, open) {
    if (open) {
      arrow.classList.add("rotated");
      dropdown.classList.add("active");
    } else {
      arrow.classList.remove("rotated");
      dropdown.classList.remove("active");
    }
  }

  menuToggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("nav-active");
  });

  const searchIcon = document.createElement("div");
  searchIcon.setAttribute("class", "search-icon-mobile");
  searchIcon.innerHTML = `<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.8474 20.1109L17.2407 16.5042C18.8207 14.7499 19.7917 12.437 19.7917 9.8958C19.7917 4.43931 15.3524 0 9.89585 0C4.43931 0 0 4.43931 0 9.89585C0 15.3524 4.43931 19.7917 9.89585 19.7917C12.437 19.7917 14.7499 18.8207 16.5042 17.2407L20.1109 20.8474C20.2127 20.9491 20.346 21 20.4792 21C20.6125 21 20.7457 20.9491 20.8475 20.8474C21.0509 20.6439 21.0509 20.3144 20.8474 20.1109ZM9.89585 18.75C5.01406 18.75 1.0417 14.7781 1.0417 9.89585C1.0417 5.01358 5.01406 1.04165 9.89585 1.04165C14.7776 1.04165 18.75 5.01353 18.75 9.89585C18.75 14.7782 14.7776 18.75 9.89585 18.75Z" fill="#25396F"/>
  </svg>`;

  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      sidebar.classList.contains("narrow-sidebar")
        ? sidebar.classList.remove("narrow-sidebar")
        : null;
      mainContent.classList.contains("wide-body")
        ? mainContent.classList.remove("wide-body")
        : null;
    }

    if (window.innerWidth > 576) {
      sidebar.classList.contains("nav-active")
        ? sidebar.classList.remove("nav-active")
        : null;
      menuToggleCheckobx.checked = false;
    }

    if (window.innerWidth < 992) {
      navbarRightSide.insertBefore(searchIcon, navbarRightSide.firstChild);
    }

    if (window.innerWidth > 768) {
      navbarSearch.classList.contains("search-mobile")
        ? navbarSearch.classList.remove("search-mobile")
        : null;

      sidebarToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path d="M16.707 4.707 9.414 12l7.293 7.293-1.414 1.414L6.586 12l8.707-8.707 1.414 1.414z"></path>
        </svg>
        `;
    }

    if (
      window.innerWidth > 768 &&
      sidebar.classList.contains("narrow-sidebar")
    ) {
      sidebarToggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path
          d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
        />
      </svg>`;
    }
  });

  if (window.innerWidth < 992) {
    navbarRightSide.insertBefore(searchIcon, navbarRightSide.firstChild);
  }

  searchIcon.addEventListener("click", () => {
    navbarSearch.classList.add("search-mobile");
    searchCrossBtn.innerHTML = `
    <svg viewBox="0 0 20 19.84" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z"
      />
    </svg>
    `;
  });

  searchCrossBtn.addEventListener("click", () => {
    navbarSearch.classList.remove("search-mobile");
  });

  if (sidebar.innerWidth >= 250) {
    sidebarToggleBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M16.707 4.707 9.414 12l7.293 7.293-1.414 1.414L6.586 12l8.707-8.707 1.414 1.414z"></path>
    </svg>
    `;
  } else if (sidebar.innerWidth < 250) {
    sidebarToggleBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path
          d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
        />
      </svg>
    `;
  }

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    console.log(walk);
  });
});

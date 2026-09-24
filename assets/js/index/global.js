export function customDropdown() {
  const dropdowns = document.querySelectorAll(
    ".dropdown-custom, .dropdown-custom-select",
  );
  if (!dropdowns.length) return;
  dropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector(".dropdown-custom-btn");
    const dropdownMenu = dropdown.querySelector(".dropdown-custom-menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom-item");
    const valueSelect = dropdown.querySelector(".value-select");
    const displayText = dropdown.querySelector(".dropdown-custom-text");
    const targetInput = dropdown.dataset.input
      ? document.querySelector(dropdown.dataset.input)
      : null;

    const isSelectType = dropdown.classList.contains("dropdown-custom-select");

    btnDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns(dropdown);
      dropdownMenu.classList.toggle("dropdown--active");
      btnDropdown.classList.toggle("--active");
      btnDropdown.setAttribute(
        "aria-expanded",
        String(dropdownMenu.classList.contains("dropdown--active")),
      );
    });

    document.addEventListener("click", function () {
      closeAllDropdowns();
    });

    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        if (isSelectType) {
          const optionText = item.textContent;
          displayText.innerHTML = item.innerHTML;
          dropdown.classList.add("selected");
          if (targetInput) {
            targetInput.value = item.dataset.value || optionText.trim();
            targetInput.dispatchEvent(new Event("change", { bubbles: true }));
          }
        } else {
          const currentImgEl = valueSelect.querySelector("img");
          const currentImg = currentImgEl ? currentImgEl.src : "";
          const currentText = valueSelect.querySelector("span").textContent;
          const clickedHtml = item.innerHTML;

          valueSelect.innerHTML = clickedHtml;

          const isSelectTime = currentText.trim() === "Time";

          if (!isSelectTime) {
            if (currentImg) {
              item.innerHTML = `<img src="${currentImg}" alt="" /><span>${currentText}</span>`;
            } else {
              item.innerHTML = `<span>${currentText}</span>`;
            }
          }
        }

        closeAllDropdowns();
      });
    });

    window.addEventListener("scroll", function () {
      if (dropdownMenu.closest(".header-lang")) {
        dropdownMenu.classList.remove("dropdown--active");
        btnDropdown.classList.remove("--active");
      }
    });
  });

  function closeAllDropdowns(exception) {
    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-custom-menu");
      const btn = dropdown.querySelector(".dropdown-custom-btn");

      if (!exception || dropdown !== exception) {
        menu.classList.remove("dropdown--active");
        btn.classList.remove("--active");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }
}

export function contact() {
  const qrWidget = document.querySelector(".contact-qr");

  if (
    qrWidget &&
    qrWidget.dataset.lightboxInitialized !== "true" &&
    typeof window.GLightbox === "function"
  ) {
    qrWidget.dataset.lightboxInitialized = "true";
    window.GLightbox({
      selector: ".contact-qr__link",
      openEffect: "zoom",
      closeEffect: "zoom",
      slideEffect: "fade",
      touchNavigation: true,
      keyboardNavigation: true,
      closeOnOutsideClick: true,
      zoomable: false,
    });
  }

  const form = document.querySelector(".form-contact");
  if (!form) return;

  const contactSection = form.closest(".section-contact") || document;
  const menuTriggers = contactSection.querySelectorAll(
    ".contact-menu-lightbox",
  );

  if (typeof window.GLightbox === "function") {
    menuTriggers.forEach((trigger) => {
      if (trigger.dataset.lightboxInitialized === "true") return;

      const imageUrl = trigger.getAttribute("href");
      if (!imageUrl) return;

      const menuLightbox = window.GLightbox({
        elements: [
          {
            href: imageUrl,
            type: "image",
          },
        ],
        skin: "contact-menu",
        openEffect: "zoom",
        closeEffect: "zoom",
        slideEffect: "fade",
        touchNavigation: false,
        keyboardNavigation: true,
        closeOnOutsideClick: true,
        zoomable: false,
      });

      trigger.dataset.lightboxInitialized = "true";
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        menuLightbox.open();
      });
    });
  }

  if (form.dataset.contactInitialized === "true") return;
  form.dataset.contactInitialized = "true";

  const countryList = form.querySelector("#contact-country-list");
  const countryCodes = [
    "AD",
    "AE",
    "AF",
    "AG",
    "AI",
    "AL",
    "AM",
    "AO",
    "AR",
    "AT",
    "AU",
    "AW",
    "AZ",
    "BA",
    "BB",
    "BD",
    "BE",
    "BF",
    "BG",
    "BH",
    "BI",
    "BJ",
    "BN",
    "BO",
    "BR",
    "BS",
    "BT",
    "BW",
    "BY",
    "BZ",
    "CA",
    "CD",
    "CF",
    "CG",
    "CH",
    "CI",
    "CL",
    "CM",
    "CN",
    "CO",
    "CR",
    "CU",
    "CV",
    "CY",
    "CZ",
    "DE",
    "DJ",
    "DK",
    "DM",
    "DO",
    "DZ",
    "EC",
    "EE",
    "EG",
    "ER",
    "ES",
    "ET",
    "FI",
    "FJ",
    "FM",
    "FR",
    "GA",
    "GB",
    "GD",
    "GE",
    "GH",
    "GM",
    "GN",
    "GQ",
    "GR",
    "GT",
    "GW",
    "GY",
    "HK",
    "HN",
    "HR",
    "HT",
    "HU",
    "ID",
    "IE",
    "IL",
    "IN",
    "IQ",
    "IR",
    "IS",
    "IT",
    "JM",
    "JO",
    "JP",
    "KE",
    "KG",
    "KH",
    "KI",
    "KM",
    "KN",
    "KP",
    "KR",
    "KW",
    "KZ",
    "LA",
    "LB",
    "LC",
    "LI",
    "LK",
    "LR",
    "LS",
    "LT",
    "LU",
    "LV",
    "LY",
    "MA",
    "MC",
    "MD",
    "ME",
    "MG",
    "MH",
    "MK",
    "ML",
    "MM",
    "MN",
    "MO",
    "MR",
    "MT",
    "MU",
    "MV",
    "MW",
    "MX",
    "MY",
    "MZ",
    "NA",
    "NE",
    "NG",
    "NI",
    "NL",
    "NO",
    "NP",
    "NR",
    "NZ",
    "OM",
    "PA",
    "PE",
    "PG",
    "PH",
    "PK",
    "PL",
    "PS",
    "PT",
    "PW",
    "PY",
    "QA",
    "RO",
    "RS",
    "RU",
    "RW",
    "SA",
    "SB",
    "SC",
    "SD",
    "SE",
    "SG",
    "SI",
    "SK",
    "SL",
    "SM",
    "SN",
    "SO",
    "SR",
    "SS",
    "ST",
    "SV",
    "SY",
    "SZ",
    "TD",
    "TG",
    "TH",
    "TJ",
    "TL",
    "TM",
    "TN",
    "TO",
    "TR",
    "TT",
    "TV",
    "TW",
    "TZ",
    "UA",
    "UG",
    "US",
    "UY",
    "UZ",
    "VA",
    "VC",
    "VE",
    "VN",
    "VU",
    "WS",
    "YE",
    "ZA",
    "ZM",
    "ZW",
  ];

  if (countryList && !countryList.querySelector(".dropdown-custom-item")) {
    const locale = document.documentElement.lang || "en";
    const countryNames =
      typeof Intl.DisplayNames === "function"
        ? new Intl.DisplayNames([locale], { type: "region" })
        : null;
    countryCodes
      .map((code) => ({
        code,
        name: countryNames?.of(code) || code,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, locale))
      .forEach(({ code, name }) => {
        const item = document.createElement("button");
        item.className = "dropdown-custom-item";
        item.type = "button";
        item.setAttribute("role", "option");
        item.dataset.value = code;
        item.innerHTML = `<span class="country-flag fi fi-${code.toLowerCase()}" aria-hidden="true"></span><span>${name}</span>`;
        countryList.appendChild(item);
      });
  }

  const countrySearch = form.querySelector("#contact-country-search");
  const countryItems = countryList?.querySelectorAll(".dropdown-custom-item");

  if (countrySearch && countryItems?.length) {
    const normalizeText = (text) =>
      text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    const resetCountrySearch = () => {
      countrySearch.value = "";
      countryItems.forEach((item) => {
        item.hidden = false;
      });
    };

    countrySearch.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    countrySearch.addEventListener("input", () => {
      const keyword = normalizeText(countrySearch.value);
      countryItems.forEach((item) => {
        item.hidden = !normalizeText(item.textContent).includes(keyword);
      });
    });

    countryItems.forEach((item) => {
      item.addEventListener("click", resetCountrySearch);
    });
  }

  const syncField = (field) => {
    const wrapper = field.closest(".form-contact__field");
    if (!wrapper) return;
    wrapper.classList.toggle("has-value", Boolean(field.value.trim()));
  };

  const formFields = form.querySelectorAll(
    "input:not(.country-search__input), textarea, select",
  );

  formFields.forEach((field) => {
    syncField(field);
    ["input", "change", "blur"].forEach((eventName) => {
      field.addEventListener(eventName, () => {
        syncField(field);
        if (field.value.trim()) {
          field.closest(".form-contact__field")?.classList.remove("error");
        }
      });
    });
  });

  const dateField = form.querySelector("#contact-date");
  if (dateField && typeof Lightpick !== "undefined") {
    new Lightpick({
      field: dateField,
      minDate: new Date(),
      singleDate: true,
      numberOfMonths: 1,
      format: "DD/MM/YYYY",
      onSelect: () => {
        syncField(dateField);
        dateField.dispatchEvent(new Event("change", { bubbles: true }));
      },
    });
  }

  const requiredItems = Array.from(form.querySelectorAll("[required]"))
    .map((field) => field.closest(".form-contact__field"))
    .filter(
      (formItem, index, items) =>
        formItem && items.indexOf(formItem) === index,
    );

  const getFieldValue = (formItem) => {
    const field = formItem.querySelector("input, textarea, select");
    return field?.value.trim() || "";
  };

  const validateForm = () => {
    let isValid = true;
    let firstInvalidItem = null;

    requiredItems.forEach((formItem) => {
      const hasValue = getFieldValue(formItem).length > 0;
      formItem.classList.toggle("error", !hasValue);

      if (!hasValue) {
        isValid = false;
        firstInvalidItem ||= formItem;
      }
    });

    if (firstInvalidItem) {
      const visibleControl = firstInvalidItem.querySelector(
        ".dropdown-custom-btn, select, input:not(.visually-hidden), textarea",
      );
      visibleControl?.focus();
    }

    return isValid;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const submitButton =
      event.submitter || form.querySelector('[type="submit"]');
    const emailRecipient =
      submitButton?.getAttribute("email-recepient")?.trim() || "";
    const formData = new FormData(form);

    formData.set("email-recepient", emailRecipient);

    form.dispatchEvent(
      new CustomEvent("contact-form:ajax-submit", {
        bubbles: true,
        detail: {
          action: form.action,
          method: form.method.toUpperCase(),
          emailRecipient,
          formData,
          data: Object.fromEntries(formData.entries()),
          submitButton,
        },
      }),
    );
  });
}
export function headerScroll() {
  const header = document.getElementById("header");
  if (!header) return null;

  let lastScroll = 0;

  const trigger = ScrollTrigger.create({
    start: "top top",
    end: 9999,
    onUpdate: (self) => {
      const currentScroll = self.scroll();

      if (currentScroll <= 0) {
        header.classList.remove("scrolled");
      } else if (currentScroll > lastScroll) {
        // Scroll down
        header.classList.add("scrolled");
      } else {
        // Scroll up
        header.classList.remove("scrolled");
      }

      lastScroll = currentScroll;
    },
  });

  return trigger;
}

/////// thêm class select-tab vào thì vẫn filter theo đúng type đó, không show hết item.
export function createFilterTab() {
  document.querySelectorAll(".filter-section").forEach((section) => {
    let result;

    const targetSelector = section.dataset.target;
    if (targetSelector) {
      result = document.querySelector(targetSelector);
    } else {
      result = section.querySelector(".filter-section-result");
      if (!result) {
        result = section.nextElementSibling;
        if (!result?.classList.contains("filter-section-result")) return;
      }
    }

    if (!result) return;
    //check select tab
    const isSelectTab = section.classList.contains("select-tab");
    const buttons = section.querySelectorAll(".filter-button[data-type]");

    const activeBtn = section.querySelector(".filter-button.active");
    if (activeBtn) {
      const activeType = activeBtn.dataset.type;
      if (activeType !== "all") {
        result.querySelectorAll(".filter-item").forEach((item) => {
          item.style.display = item.classList.contains(activeType)
            ? ""
            : "none";
        });
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        section
          .querySelectorAll(".filter-button")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const type = this.dataset.type;
        const items = result.querySelectorAll(".filter-item");

        gsap
          .timeline()
          .to(result, { autoAlpha: 0, duration: 0.3 })
          .call(() => {
            items.forEach((item) => {
              // Nếu là select-tab thì không có trường hợp "all" → luôn filter theo type
              if (!isSelectTab && type === "all") {
                item.style.display = "";
              } else {
                item.style.display = item.classList.contains(type)
                  ? ""
                  : "none";
              }
            });
          })
          .to(result, { autoAlpha: 1, duration: 0.3 });
      });
    });
  });
}

export function getDateLightPick() {
  var picker = new Lightpick({
    field: document.getElementById("datepicker"),
    minDate: new Date(),
    singleDate: false,
    numberOfMonths: 2,
    // lang: "en-US",
  });
}

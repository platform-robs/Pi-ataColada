// ============ Helpers ============
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

// ============ Año en footer ============
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============ Menú móvil ============
const menuBtn = $("#menuBtn");
const mobileNav = $("#mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
  });

  // cerrar si das click en un link
  $$("#mobileNav a").forEach(a => {
    a.addEventListener("click", () => mobileNav.classList.remove("show"));
  });
}

// ============ WhatsApp ============
function openWhats(){
  const phone = "5210000000000"; // <-- CAMBIA AQUÍ TU NÚMERO
  const msg = encodeURIComponent("Hola 😊 quiero cotizar una piñata personalizada.");
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

const btnWhats = $("#btnWhats");
const btnWhatsMobile = $("#btnWhatsMobile");
if (btnWhats) btnWhats.addEventListener("click", openWhats);
if (btnWhatsMobile) btnWhatsMobile.addEventListener("click", openWhats);

// ============ Modal legal ============
const modalLegal = $("#modalLegal");
const btnPrivacy = $("#btnPrivacy");
const btnTerms = $("#btnTerms");
const closeLegal = $("#closeLegal");

const legalTitle = $("#legalTitle");
const legalSubtitle = $("#legalSubtitle");
const legalBody = $("#legalBody");

function openLegal(type){
  if (!modalLegal) return;

  modalLegal.classList.add("show");
  document.body.style.overflow = "hidden";

  if (type === "privacy") {
    legalTitle.textContent = "Aviso de privacidad";
    legalSubtitle.textContent = "Cómo tratamos tu información.";

    legalBody.innerHTML = `
      <p><b>Piñata Colada</b> utiliza tus datos únicamente para:</p>
      <ul>
        <li>Responder tu cotización</li>
        <li>Confirmar pedido y fecha</li>
        <li>Contactarte por WhatsApp o llamada</li>
      </ul>
      <p>No compartimos tus datos con terceros.</p>
    `;
  } else {
    legalTitle.textContent = "Términos y condiciones";
    legalSubtitle.textContent = "Información importante antes de pedir.";

    legalBody.innerHTML = `
      <p>Al cotizar aceptas que:</p>
      <ul>
        <li>Las piñatas se trabajan por pedido.</li>
        <li>La fecha de entrega se agenda.</li>
        <li>Diseños complejos pueden variar ligeramente.</li>
      </ul>
      <p>Si tienes dudas, contáctanos y te ayudamos.</p>
    `;
  }
}

function closeLegalModal(){
  if (!modalLegal) return;
  modalLegal.classList.remove("show");
  document.body.style.overflow = "";
}

if (btnPrivacy) btnPrivacy.addEventListener("click", () => openLegal("privacy"));
if (btnTerms) btnTerms.addEventListener("click", () => openLegal("terms"));
if (closeLegal) closeLegal.addEventListener("click", closeLegalModal);

if (modalLegal){
  modalLegal.addEventListener("click", (e) => {
    if (e.target === modalLegal) closeLegalModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLegalModal();
  });
}

// ============ Formulario (solo existe en Contacto.html) ============
const quoteForm = $("#quoteForm");

if (quoteForm) {
  quoteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btnSend = $("#btnSend");
    const status = $("#formStatus");

    try {
      if (btnSend) {
        btnSend.disabled = true;
        btnSend.textContent = "Enviando…";
      }
      if (status) status.textContent = "Enviando tu cotización…";

      const data = {
        nombre: $("#nombre")?.value?.trim(),
        telefono: $("#telefono")?.value?.trim(),
        fecha: $("#fecha")?.value?.trim(),
        tamanio: $("#tamanio")?.value?.trim(),
        tema: $("#tema")?.value?.trim(),
        notas: $("#notas")?.value?.trim(),
      };

      // Validación mínima
      if (!data.nombre || !data.telefono || !data.fecha || !data.tamanio) {
        throw new Error("Completa nombre, teléfono, fecha y tamaño.");
      }

      // 🔥 AQUÍ VA TU URL DEL WEB APP (Apps Script)
      const ENDPOINT = "PON_AQUI_TU_URL_DEL_WEB_APP";

      const res = await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Como usamos no-cors, no podemos leer respuesta
      if (status) status.textContent = "✅ Cotización enviada. Te contactaremos pronto.";
      quoteForm.reset();

    } catch (err) {
      alert("❌ No se pudo enviar tu cotización.\n\n" + err.message);
      if (status) status.textContent = "❌ No se pudo enviar. Intenta de nuevo.";
    } finally {
      if (btnSend) {
        btnSend.disabled = false;
        btnSend.textContent = "Enviar cotización";
      }
    }
  });
}

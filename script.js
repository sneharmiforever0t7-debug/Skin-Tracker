document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");
  const main = document.getElementById("main");
  const cover = document.getElementById("cover");
  const showRoutineBtn = document.getElementById("showRoutineBtn");
  const skinTypeSelect = document.getElementById("skinType");
  const resultBox = document.getElementById("result");

  nextBtn.onclick = () => {
    cover.style.display = "none";
    main.style.display = "block";
  };

  const routines = {
    oily: [
      "Foaming or Gel Cleanser",
      "Niacinamide Serum",
      "Oil-free Moisturizer",
      "Gel-based Sunscreen"
    ],
    dry: [
      "Cream Cleanser",
      "Hyaluronic Acid Serum",
      "Thick Moisturizer",
      "Hydrating Sunscreen"
    ],
    normal: [
      "Gentle Cleanser",
      "Brightening Serum",
      "Normal Moisturizer",
      "SPF 30+ Sunscreen"
    ],
    combination: [
      "Gel Cleanser",
      "Vitamin C or Niacinamide Serum",
      "Light Moisturizer",
      "SPF 30+ Sunscreen"
    ],
    sensitive: [
      "Fragrance-free Cleanser",
      "Aloe / Centella Serum",
      "Hypoallergenic Moisturizer",
      "Mineral Sunscreen"
    ]
  };
const descriptions = {
  "Foaming or Gel Cleanser": "Helps remove excess oil and dirt without stripping your skin.",
  "Niacinamide Serum": "Reduces oiliness and improves skin texture.",
  "Oil-free Moisturizer": "Hydrates without clogging pores — perfect for oily skin.",
  "Gel-based Sunscreen": "Lightweight sun protection that won’t feel greasy.",

  "Cream Cleanser": "Gently cleanses while adding moisture — ideal for dry skin.",
  "Hyaluronic Acid Serum": "Deeply hydrates and plumps your skin.",
  "Thick Moisturizer": "Locks in hydration and prevents flakiness.",
  "Hydrating Sunscreen": "Protects while keeping skin soft and moisturized.",

  "Gentle Cleanser": "Mild and non-stripping — great for everyday use.",
  "Brightening Serum": "Improves glow and evens out skin tone.",
  "Normal Moisturizer": "Balances hydration for healthy skin.",
  "SPF 30+ Sunscreen": "Shields your skin from UV damage.",

  "Vitamin C or Niacinamide Serum": "Brightens and protects against environmental stress.",
  "Light Moisturizer": "Hydrates without heaviness — perfect for combo skin.",

  "Fragrance-free Cleanser": "Avoids irritation by skipping perfumes and harsh additives.",
  "Aloe / Centella Serum": "Soothes redness and calms sensitive skin.",
  "Hypoallergenic Moisturizer": "Minimizes allergic reactions with gentle ingredients.",
  "Mineral Sunscreen": "Uses zinc or titanium to reflect UV rays — ideal for sensitive skin."
};


const userNoteInput = document.getElementById("userNote");

showRoutineBtn.onclick = () => {
  const type = skinTypeSelect.value;
  const note = userNoteInput.value.trim();
  let suggestion = "";

if (note.includes("sun") || note.includes("UV")) {
  suggestion = "🌞 Tip: Try a mineral sunscreen with zinc oxide for better sun protection.";
} else if (note.includes("dry") || note.includes("flaky")) {
  suggestion = "💧 Tip: Use a hydrating serum with hyaluronic acid and avoid foaming cleansers.";
} else if (note.includes("irritated") || note.includes("red")) {
  suggestion = "🍃 Tip: Look for products with Centella Asiatica or Aloe Vera to calm irritation.";
} else if (note.includes("oily") || note.includes("greasy")) {
  suggestion = "✨ Tip: Use a gel-based cleanser and avoid heavy creams.";
}

  if (!type) {
    resultBox.style.display = "none";
    return;
  }

  const steps = routines[type];
  resultBox.innerHTML =
  "<h3 style='color:#ff77b4; text-align:center;'>Your Routine 💗</h3>" +
steps.map(step => `
  <div class='step'>
    <strong>${step}</strong><br>
    <span style="font-size:14px; color:#555;">${descriptions[step] || ""}</span>
  </div>
`).join("")
+
  (note ? `<p style='margin-top:15px; font-style:italic;'>📝 Your note: ${note}</p>` : "") +
  (suggestion ? `<p style='margin-top:10px;'>${suggestion}</p>` : "");

  resultBox.style.display = "block";
};
});
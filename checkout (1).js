// Replace with your verified merchant UPI ID before using the QR option.
const MERCHANT_UPI_ID = "campusrent@upi";
const booking = JSON.parse(localStorage.getItem("cr_pending_booking") || "null");
const byId = id => document.getElementById(id);
const money = n => "₹" + Number(n).toLocaleString("en-IN");

if (!booking) {
  byId("checkoutSummary").innerHTML = '<p>No booking details found. <a href="index01.html#catalog">Choose a rental</a> first.</p>';
  document.querySelectorAll(".checkout-options,#qrPanel,#spotPanel").forEach(el => el.hidden = true);
} else {
  byId("checkoutSummary").innerHTML = `<div><span>Rental item</span><strong>${escapeHtml(booking.equipment)}</strong></div><div><span>Rental dates</span><strong>${escapeHtml(booking.start)} – ${escapeHtml(booking.end)} (${booking.days} day${booking.days===1?"":"s"})</strong></div><div class="checkout-total"><span>Total</span><strong>${money(booking.total)}</strong></div>`;
  byId("merchantUpi").textContent = MERCHANT_UPI_ID;
  const payee = encodeURIComponent("CampusRent");
  const upi = `upi://pay?pa=${encodeURIComponent(MERCHANT_UPI_ID)}&pn=${payee}&am=${encodeURIComponent(booking.total)}&cu=INR&tn=${encodeURIComponent("CampusRent rental " + booking.id)}`;
  byId("upiDeepLink").href = upi;
  byId("paymentQr").src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upi)}`;
  byId("paymentQr").onload = () => byId("qrLoading").hidden = true;
  byId("paymentQr").onerror = () => byId("qrLoading").textContent = "QR unavailable. Use the Open UPI app button.";
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function selectCheckoutMethod(method){
  byId("qrChoice").classList.toggle("selected",method==="qr");byId("spotChoice").classList.toggle("selected",method==="spot");
  byId("qrPanel").hidden=method!=="qr";byId("spotPanel").hidden=method!=="spot";
}
function completeCheckout(method,status){
  if(!booking)return;
  const all=JSON.parse(localStorage.getItem("cr_bookings")||"[]");
  const bookingStatus=status==="Due at pickup"?"Confirmed – pay at pickup":status==="Demo payment complete"?"Demo payment complete":"Pending payment verification";
  all.push({...booking,payment:{method,status},status:bookingStatus});
  localStorage.setItem("cr_bookings",JSON.stringify(all));localStorage.removeItem("cr_pending_booking");
  document.querySelectorAll(".checkout-options,#qrPanel,#spotPanel").forEach(el=>el.hidden=true);
  byId("checkoutDone").hidden=false;
  const message=status==="Due at pickup"?"Your rental request is confirmed. Pay the owner when you collect the item.":status==="Demo payment complete"?"Demo payment simulated successfully. No real payment was made.":"Your request is saved as pending payment verification. The merchant must verify receipt before treating this as paid.";
  byId("checkoutDone").innerHTML=`<div class="done-mark">✓</div><h2>${status==="Demo payment complete"?"Demo payment complete":"Request saved"}</h2><p>${message}</p><a href="index01.html#catalog" class="btn btn-primary">Back to rentals</a>`;
}

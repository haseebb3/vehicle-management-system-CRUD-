const vehicleForm = document.getElementById("vehicleForm");
const vehicleTable = document.getElementById("vehicleTable");
const addVehicleBtn = document.getElementById("addVehicleBtn");
const updateVehicleBtn = document.getElementById("updateVehicleBtn");
const brandControl = document.getElementById("brand");
const modelControl = document.getElementById("model");
const linkControl = document.getElementById("link");
const priceControl = document.getElementById("price");
const colorControl = document.getElementById("color");
const featuresControl = document.getElementById("features");
const stockAvailabilityControl = document.getElementById("stockAvailability");

const defaultArr = [
  {
    vehicleId: "veh-001",
    brand: "Mercedes-Benz",
    model: "C-Class",
    imageLink: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8",
    price: 6500000,
    color: "Obsidian Black",
    features: "Sunroof, Leather Seats, Automatic",
    stockAvailability: "yes",
  },
  {
    vehicleId: "veh-002",
    brand: "BMW",
    model: "3 Series",
    imageLink: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
    price: 5800000,
    color: "Alpine White",
    features: "LED Lights, Navigation, Cruise Control",
    stockAvailability: "yes",
  },
  {
    vehicleId: "veh-003",
    brand: "Toyota",
    model: "Fortuner",
    imageLink: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",
    price: 4200000,
    color: "Pearl White",
    features: "4x4, Sunroof, Automatic, Leather Seats",
    stockAvailability: "no",
  },
];

const defaultVehicleImage ="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";



let getArr = localStorage.getItem("vehicleArr");
let vehicleArr;

if (getArr) {
  vehicleArr = JSON.parse(getArr);
} else {
  vehicleArr = defaultArr;
  localStorage.setItem("vehicleArr", JSON.stringify(vehicleArr));
}





// read
function showVehicles(arr) {
  let res = ``;
  arr.forEach((ele, idx) => {
    res += `<tr id="${ele.vehicleId}">
                    <td>${idx + 1}</td>
                    <td>${ele.brand}</td>
                    <td>${ele.model}</td>
                    <td>
                    <button class="btn btn-sm btn-primary">
                    <a href="${ele.imageLink || defaultVehicleImage}" target="_blank" class="text-white">View car</a>
                    </button>
                    </td>
                    <td>${ele.price}</td>
                    <td>${ele.color}</td>
                    <td>${ele.features}</td>
                    <td>${ele.stockAvailability}</td>
                    <td>
                      <div class="d-flex justify-content-between align-items-center">
                        <button onclick="onVehicleEditHandler(this)" type="button" class="btn btn-outline-success btn-sm" data-edit-id="${ele.vehicleId}">Edit</button>
                        <button onclick="onVehicleDeleteHandler(this)" type="button" class="btn btn-outline-danger btn-sm "
                          data-delete-id="${ele.vehicleId}">Remove</button>
                      </div>
                    </td>
                  </tr>`;
  });

  vehicleTable.innerHTML = res;
}

showVehicles(vehicleArr);

//create
function onFormSubmitHandler(event) {
  event.preventDefault();
  const newVehicle = {
    brand: brandControl.value,
    model: modelControl.value,
    imageLink: linkControl.value,
    price: priceControl.value,
    color: colorControl.value,
    features: featuresControl.value,
    stockAvailability: stockAvailabilityControl.value,
    vehicleId: Date.now().toString(),
  };
  vehicleForm.reset();
  vehicleArr.push(newVehicle);
  localStorage.setItem("vehicleArr", JSON.stringify(vehicleArr));

  let vehicleTr = document.createElement("tr");
  vehicleTr.id = newVehicle.vehicleId;
  vehicleTr.innerHTML = `<td>${vehicleArr.length}</td>
                    <td>${newVehicle.brand}</td>
                    <td>${newVehicle.model}</td>
                    <td>
                    <button class="btn btn-sm btn-primary">
                    <a href="${newVehicle.imageLink || defaultVehicleImage}" target="_blank" class="text-white">View car</a>
                    </button>
                    </td>
                    <td>${newVehicle.price}</td>
                    <td>${newVehicle.color}</td>
                    <td>${newVehicle.features}</td>
                    <td>${newVehicle.stockAvailability}</td>
                    <td>
                      <div class="d-flex justify-content-between align-items-center">
                        <button onclick="onVehicleEditHandler(this)" type="button" class="btn btn-outline-success btn-sm" data-edit-id="${newVehicle.vehicleId}">Edit</button>
                        <button onclick="onVehicleDeleteHandler(this)"  type="button" class="btn btn-outline-danger btn-sm"
                          data-delete-id="${newVehicle.vehicleId}">Remove</button>
                      </div>
                    </td>`;

  vehicleTable.append(vehicleTr);
  Swal.fire({
    text: `Vehicle ${newVehicle.brand} ${newVehicle.model} is added successfully`,
    icon: "success",
    timer: 25000,
  });
}

//edit
function onVehicleEditHandler(ele) {
  const edit_id = ele.dataset.editId;
  const edit_obj = vehicleArr.find((el) => el.vehicleId === edit_id);
  localStorage.setItem("update_id", edit_id);
  // patching data in form controls
  // let update_trs = document.getElementById(edit_id).children;
  // console.log(update_trs);
  // update_trs[1].innerText = edit_obj.brand
  brandControl.value = edit_obj.brand;
  modelControl.value = edit_obj.model;
  colorControl.value = edit_obj.color;
  priceControl.value = edit_obj.price;
  linkControl.value = edit_obj.imageLink;
  featuresControl.value = edit_obj.features;
  stockAvailabilityControl.value = edit_obj.stockAvailability;

  addVehicleBtn.classList.add("d-none");
  updateVehicleBtn.classList.remove("d-none");
}

//update
function onVehicleUpdateHandler() {
  let update_id = localStorage.getItem("update_id");
  localStorage.removeItem("update_id");
  let updated_obj = {
    brand: brandControl.value,
    model: modelControl.value,
    color: colorControl.value,
    price: priceControl.value,
    imageLink: linkControl.value,
    features: featuresControl.value,
    stockAvailability : stockAvailabilityControl.value,
    vehicleId: update_id,
  };
  let update_idx = vehicleArr.findIndex((el) => el.vehicleId === update_id);
  vehicleArr[update_idx] = updated_obj;
  localStorage.setItem("vehicleArr", JSON.stringify(vehicleArr));
  let update_tr = document.getElementById(update_id).children;
  update_tr[1].innerText = updated_obj.brand;
  update_tr[2].innerText = updated_obj.model;
  // update_tr[3].innerText = updated_obj.imageLink;
  update_tr[4].innerText = updated_obj.price;
  update_tr[5].innerText = updated_obj.color;
  update_tr[6].innerText = updated_obj.features;
  update_tr[7].innerText = updated_obj.stockAvailability;

  vehicleForm.reset();
  updateVehicleBtn.classList.add("d-none");
  addVehicleBtn.classList.remove("d-none");

  Swal.fire({
    text: `Vehicle ${updated_obj.brand} ${updated_obj.model} is updated successfully`,
    icon: "success",
    timer: 25000,
  });

  // let item_tobe_deleted = document.getElementById(update_id).previousElementSibling;
  // item_tobe_deleted.remove();
}

//delete
function onVehicleDeleteHandler(ele) {
  let dlt_id = ele.dataset.deleteId;
  let dlt_obj = vehicleArr.find((el) => el.vehicleId === dlt_id);

  Swal.fire({
    title: "Are you sure?",
    text: `You want to delete ${dlt_obj.brand} ${dlt_obj.model} ?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      let dlt_idx = vehicleArr.findIndex((el) => el.vehicleId === dlt_id);
      vehicleArr.splice(dlt_idx, 1);
      localStorage.setItem("vehicleArr", JSON.stringify(vehicleArr));
      ele.closest("tr").remove();

      Swal.fire({
        title: "Deleted!",
        text: "Your vehicle has been deleted.",
        icon: "success",
      });
      //alter seriel number after delete
      let alterTrs = document.querySelectorAll(
        "#vehicleTable tr td:first-child",
      );
      alterTrs.forEach((el, idx) => (el.innerText = idx + 1));
    }
  });
}

vehicleForm.addEventListener("submit", onFormSubmitHandler);
updateVehicleBtn.addEventListener("click", onVehicleUpdateHandler);

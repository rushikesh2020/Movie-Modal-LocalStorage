const modalOpen = document.querySelector(".main-movies-btn");
const backdrop = document.querySelector(".backdrop");
const movieModal = document.querySelector(".movie-modal");
const addMovieBtn = document.querySelector(".add-movie-btn");
const cancelBtn = document.querySelector(".cancel-btn");
let movieName = document.getElementById("movie-name");
let movieURL = document.getElementById("movie-url");
let movieOverview = document.getElementById("movie-overview");
let movieRating = document.getElementById("movie-rating");
const movieContainer = document.getElementById("movie-container");
const updateMovie = document.querySelector(".update-movie-btn");
// const editBtn = document.getElementById("edit-btn");
// const dltBtn = document.getElementById('dlt-btn')

let editId;
let movieArr;
// localStorage.setItem("movieArr", JSON.stringify(movieArr));

function onClickMainBtn() {
	toggleModal();
}

function toggleModal() {
	backdrop.classList.toggle("d-none");
	movieModal.classList.toggle("d-none");
}

function UUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			const r = (Math.random() * 16) | 0,
				v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		}
	);
}

function movieArrTemplating(arr) {
	let result = "";
	arr.forEach(element => {
		result += `
		<div class="col-md-4">
					<div class="card">
						<figure id = ${element.mID} class="movie-card">
							<img
								src="${element.mUrl}"
								alt=""
							/>
							<figcaption>
								<div class="rating-section">
									<div class="row">
										<div class="col-10">
											<h3 id="movie-name">
												${element.mName}
											</h3>
										</div>
										<div class="col-2 align-self-center mb-0">
											<span class=${
												element.mRating >= 4
													? "bg-success"
													: element.mRating >= 2
													? "bg-warning"
													: "bg-danger"
											}>
										 ${element.mRating} </span>
										</div>
									</div>
								</div>
								<div class="overview-section">
									<h3>${element.mName}</h3>
									<em>overview</em>
									<p>
										${element.mOverview}
									</p>

									<div class="action">
										<button
											type="button"
											class="btn btn-primary"
											id="edit-btn"
											onClick="onEditBtn(this)"
										>
											<i
												class="fa-regular fa-pen-to-square"
											></i>
										</button>
										<button
											type="button"
											class="btn btn-danger"
											id="dlt-btn"
											onClick="onDltBtn(this)"
										>
											<i class="fa-solid fa-trash"></i>
										</button>
									</div>
								</div>
							</figcaption>
						</figure>
					</div>
				</div>
		`;

		movieContainer.innerHTML = result;
	});
}

if (localStorage.getItem("movieArr")) {
	movieArr = JSON.parse(localStorage.getItem("movieArr"));
	movieArrTemplating(movieArr);
} else {
	let movieArr = [];
}

function onDltBtn(ele) {
	let dltId = ele.closest(".movie-card").id;
	let dltIndex = movieArr.findIndex(movie => movie.mID === dltId);
	let dltObj = movieArr[dltIndex];
	Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
	}).then(result => {
		if (result.isConfirmed) {
			movieArr.splice(dltIndex, 1);
			localStorage.setItem("movieArr", movieArr);
			ele.closest(".col-md-4").remove();
			Swal.fire({
				title: `${dltObj.mName} movie is deleted successfully`,
				text: "Your file has been deleted.",
				icon: "success",
			});
		}
	});
}

function onEditBtn(ele) {
	toggleModal();
	addMovieBtn.classList.add("d-none");
	updateMovie.classList.toggle("d-none");

	editId = ele.closest(".movie-card").id;
	// localStorage.setItem("editId", editId);
	// console.log(localStorage.getItem("editId"));
	// console.log(movieArr);

	let obj = movieArr.find(movie => movie.mID == editId);

	// console.log(obj);
	movieName.value = obj.mName;
	movieURL.value = obj.mUrl;
	movieOverview.value = obj.mOverview;
	movieRating.value = obj.mRating;
}

function onUpdateMovie() {
	let updatedObj = {
		mID: editId,
		mName: movieName.value,
		mUrl: movieURL.value,
		mOverview: movieOverview.value,
		mRating: movieRating.value,
	};

	movieArr[movieArr.findIndex(movie => movie.mID === editId)] = updatedObj;
	localStorage.setItem("movieArr", JSON.stringify(movieArr));

	let getCard = document.getElementById(editId);
	getCard.innerHTML = `
	<img
								src=${updatedObj.mUrl}
								alt=""
							/>
							<figcaption>
								<div class="rating-section">
									<div class="row">
										<div class="col-10">
											<h3 id="movie-name">
												${updatedObj.mName}
											</h3>
										</div>
										<div class="col-2 align-self-center mb-0">
											<span class=${
												updatedObj.mRating >= 4
													? "bg-success"
													: movieObj.mRating >= 2
													? "bg-warning"
													: "bg-danger"
											}>
										 ${updatedObj.mRating} </span>
										</div>
									</div>
								</div>
								<div class="overview-section">
									<h3>${updatedObj.mName}</h3>
									<em>overview</em>
									<p>${updatedObj.mOverview}</p>

									<div class="action">
										<button
											type="button"
											class="btn btn-primary"
											id="edit-btn"
											onClick="onEditBtn(this)"
										>
											<i
												class="fa-regular fa-pen-to-square"
											></i>
										</button>
										<button
											type="button"
											class="btn btn-danger"
											id="dlt-btn"
											onClick="onDltBtn(this)"
										>
											<i class="fa-solid fa-trash"></i>
										</button>
									</div>
								</div>
							</figcaption>
	
	`;

	Swal.fire({
		title: `${updatedObj.title} movie info updated`,
		text: "success",
		icon: "success",
		timer: 2000,
	});
}

function onAddMovies(eve) {
	eve.preventDefault();
	let movieObj = {
		mID: UUID(),
		mName: movieName.value,
		mUrl: movieURL.value,
		mOverview: movieOverview.value,
		mRating: movieRating.value,
	};

	// movieArr ? movieArr.unshift(movieObj) : movieArr.push(movieObj);
	movieArr.unshift(movieObj);
	const newCard = document.createElement("div");
	newCard.classList = "col-md-4";
	newCard.innerHTML = `
		<div class="card">
						<figure id=${movieObj.mID} class="movie-card">
							<img
								src=${movieObj.mUrl}
								alt=""
							/>
							<figcaption>
								<div class="rating-section">
									<div class="row">
										<div class="col-10">
											<h3 id="movie-name">
												${movieObj.mName}
											</h3>
										</div>
										<div class="col-2 align-self-center mb-0">
											<span class=${
												movieObj.mRating >= 4
													? "bg-success"
													: movieObj.mRating >= 2
													? "bg-warning"
													: "bg-danger"
											}>
										 ${movieObj.mRating} </span>
										</div>
									</div>
								</div>
								<div class="overview-section">
									<h3>${movieObj.mName}</h3>
									<em>overview</em>
									<p>${movieObj.mOverview}</p>

									<div class="action">
										<button
											type="button"
											class="btn btn-primary"
											id="edit-btn"
											onClick="onEditBtn(this)"
										>
											<i
												class="fa-regular fa-pen-to-square"
											></i>
										</button>
										<button
											type="button"
											class="btn btn-danger"
											id="dlt-btn"
											onClick="onDltBtn(this)"
										>
											<i class="fa-solid fa-trash"></i>
										</button>
									</div>
								</div>
							</figcaption>
						</figure>
					</div>

	`;
	movieContainer.prepend(newCard);

	localStorage.setItem("movieArr", JSON.stringify(movieArr));
	// console.log(movieArr);
	eve.target.reset();
	toggleModal();
}

modalOpen.addEventListener("click", onClickMainBtn);
movieModal.addEventListener("submit", onAddMovies);
backdrop.addEventListener("click", toggleModal);
updateMovie.addEventListener("click", onUpdateMovie);
cancelBtn.addEventListener("click", toggleModal);

 /**  # phone-hunter-api

## API Links

### Phone Search
URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

Example: https://openapi.programming-hero.com/api/phones?search=iphone


### Phone detail url:
URL Format: https://openapi.programming-hero.com/api/phone/${id}


Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089

 */
 
const loadPhone = async (searchText='samsung', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    //clear phone container cards before adding new cards 
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllBtn = document.getElementById('showAll-btn');
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    }else{
        showAllBtn.classList.add('hidden')
    }
    // console.log('is show all', isShowAll)
/*
    //display only first 12 phones show
    phones = phones.slice(0,12) */

    //display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12)
    }

    phones.forEach(phone => {
        // console.log(phone);
        // 2. create a div 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-2xl border-2 mt-3 pt-4 `;
        // 3. set innerHTML 
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="${phone.phone_name}" /></figure>
        <div class="card-body py-3">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p class="h-[20px] my-2">${phone.slug}</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-accent mt-3">Show Details</button>
            </div>
        </div>
        `;
        // 4. append 
        phoneContainer.appendChild(phoneCard);
    });
    // hidding spinner 
    toggleLoadingSpinner(false);
}

// 
const handleShowDetails = async (id) => {
    // console.log('clicked show details', id);
    // load sigle phone data 
    const res  = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data ;
    
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <div class="flex justify-center mx-auto py-4">
    <img class="text-center h-40 py-1" src="${phone.image}" alt="" />
    </div>
    <p class="font-bold text-2xl"> <span class="font-bold">Name: </span>  ${phone?.name} </p>
    <p> <span class="font-bold">Storage: </span> ${phone?.mainFeatures?.storage} </p>
    <p> <span class="font-bold">Display Size: </span> ${phone?.mainFeatures?.displaySize} </p>
    <p> <span class="font-bold">Chip Set: </span> ${phone?.mainFeatures?.chipSet} </p>
    <p> <span class="font-bold">Memory: </span> ${phone?.mainFeatures?.memory} </p>
    <p> <span class="font-bold">Slug: </span> ${phone?.slug} </p>
    <p> <span class="font-bold">Release Date: </span> ${phone?.releaseDate ? phone?.releaseDate : 'release date not available' } </p>
    <p> <span class="font-bold">Brand: </span> ${phone?.brand} </p>

    <p> <span class="font-bold">GPS: </span> ${phone?.others?.GPS || 'NO GPS'} </p>
    `

    // show the modal 
    show_details_modal.showModal();
}

// Handle search button 
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    console.log(searchText);
    loadPhone(searchText, isShowAll)
}

// Toggle loading spinner 
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all 
const handleShowAll = () => {
    handleSearch(true) ;
}


loadPhone()
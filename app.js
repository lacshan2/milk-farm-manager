// translation dictionary
const i18n = {
    en: {
        sign_in: "Sign In",
        sign_up: "Sign Up",
        no_account: "No account?",
        have_account: "Have an account?",
        logout: "Logout",
        home: "Home",
        cows: "Cows",
        expense: "Expense",
        info: "Info",
        add_cow: "Add Cow",
        save: "Save",
        cancel: "Cancel",
        edit: "Edit",
        delete: "Delete",
        clear_data: "Clear All Data",
        cow_id: "Cow ID",
        male: "Male",
        female: "Female",
        no_data: "No data available.",
        add_expense: "Add Expense",
        food: "Food",
        medicine: "Medicine",
        salary: "Salary",
        other: "Other",
        total_expenses: "Total Expenses:",
        monthly_expense: "This Month:",
        developed_by: "Developed by Valacshan",
        version: "Version 1.1.3",
        app_desc: "A simple responsive milk farm manager app built with only HTML, CSS and JavaScript using localStorage.",
        dob: "Date of Birth",
        age: "Age",
        name: "Name",
        gender: "Gender",
        calf_count: "Calf Count",
        view_calves: "View Calves",
        add_calf: "Add Calf",
        status: "Status",
        expense_type: "Expense Type",
        amount: "Amount",
        notes: "Notes",
        total_cows: "Total Cows",
        male_count: "Male Count",
        female_count: "Female Count",
        total_exp: "Total Expenses",
        this_month: "This Month Expense",
        language: "Language",
        enter_valid: "Please enter a valid 4-digit PIN.",
        invalid_credentials: "Invalid username or password.",
        enter_username: "Please enter a username.",
        user_exists: "Username already exists.",
        fill_fields: "Fill required fields.",
        pass4: "4-digit PIN",
        name: "Name",
        dob: "Date of Birth"
    },

    ta: {
        sign_in: "உள்நுழைய",
        sign_up: "பதிவுசெய்",
        no_account: "கணக்கமில்லையா?",
        have_account: "கணக்கு உள்ளதா?",
        logout: "வெளியேறு",
        home: "முகப்பு",
        cows: "மாடுகள்",
        expense: "செலவுகள்",
        info: "தகவல்",
        add_cow: "மாடுகளை சேர்க்க",
        save: "சேமி",
        cancel: "மூடு",
        edit: "திருத்து",
        delete: "அழி",
        clear_data: "அனைத்து தரவுகளையும் அழி",
        cow_id: "மாட்டு ஐடி",
        male: "ஆண்",
        female: "பெண்",
        no_data: "தகவல் இல்லை.",
        add_expense: "செலவு சேர்க்க",
        food: "உணவு",
        medicine: "மருந்து",
        salary: "சம்பளம்",
        other: "மீதமுள்ளவை",
        total_expenses: "மொத்த செலவுகள்:",
        monthly_expense: "இந்த மாதம்:",
        developed_by: "வலக்சன் உருவாக்கியது",
        version: "பதிப்பு 1.1.3",
        app_desc: "அடிப்படையாகவே HTML, CSS மற்றும் JavaScript பயன்படுத்தி உருவாக்கப்பட்ட ஒரு எளிய பொன்னீட்டு மேலாளர் செயலி.",
        dob: "பிறந்த தேதி",
        age: "வயது",
        name: "பெயர்",
        gender: "பாலினம்",
        calf_count: "கன்று கணக்கு",
        view_calves: "கன்றுகளைப் பார்க்க",
        add_calf: "கன்று சேர்க்க",
        status: "நிலை",
        expense_type: "செலவு வகை",
        amount: "தொகை",
        notes: "குறிப்புகள்",
        total_cows: "மொத்த மாடுகள்",
        male_count: "ஆண் மாடுகள்",
        female_count: "பெண் மாடுகள்",
        total_exp: "மொத்த செலவுகள்",
        this_month: "இந்த மாத செலவு",
        language: "மொழி",
        enter_valid: "சரியான 4-எண் பின் கொடுக்கவும்.",
        invalid_credentials: "தவறான பயனர் பெயர் அல்லது கடவுச்செய்தி.",
        enter_username: "தயவுசெய்து பயனர் பெயரை உள்ளிடவும்.",
        user_exists: "பயனர் பெயர் ஏற்கனவே உள்ளது.",
        fill_fields: "தேவையான அடித்தளங்களை நிரப்பவும்.",
        pass4: "4-எண் பின்",
        name: "பெயர்",
        dob: "பிறந்த தேதி"
    }
};

let currentUser = null;
let currentLang = 'en';
let currentEditCowId = null;
let currentEditCalfId = null;

// helper functions
function t(key) {
    return i18n[currentLang][key] || key;
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
function loadUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}
function setSession(user) {
    localStorage.setItem('session', user);
}
function clearSession() {
    localStorage.removeItem('session');
}
function getSession() {
    return localStorage.getItem('session');
}
function getData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}
function setData(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}

function ageFromDOB(dob) {
    if (!dob) return '';
    const birth = new Date(dob);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
        years--;
    }
    return years;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString();
}

// auth logic
function trySignIn() {
    const u = document.getElementById('signin-username').value.trim();
    const p = document.getElementById('signin-password').value.trim();
    const errorEl = document.getElementById('signin-error');
    errorEl.textContent = '';
    if (!u || p.length !== 4 || !/^[0-9]{4}$/.test(p)) {
        errorEl.textContent = t('enter_valid');
        return;
    }
    const users = loadUsers();
    const user = users.find(x => x.username === u && x.password === p);
    if (!user) {
        errorEl.textContent = t('invalid_credentials');
        return;
    }
    currentUser = u;
    setSession(u);
    showApp();
}
function trySignUp() {
    const u = document.getElementById('signup-username').value.trim();
    const p = document.getElementById('signup-password').value.trim();
    const errorEl = document.getElementById('signup-error');
    errorEl.textContent = '';
    if (!u) {
        errorEl.textContent = t('enter_username');
        return;
    }
    if (p.length !== 4 || !/^[0-9]{4}$/.test(p)) {
        errorEl.textContent = t('enter_valid');
        return;
    }
    const users = loadUsers();
    if (users.find(x => x.username === u)) {
        errorEl.textContent = t('user_exists');
        return;
    }
    users.push({username: u, password: p});
    saveUsers(users);
    currentUser = u;
    setSession(u);
    showApp();
}

// input validation helper for auth forms
function updateSignupButtonState() {
    const u = document.getElementById('signup-username').value.trim();
    const p = document.getElementById('signup-password').value.trim();
    const btn = document.getElementById('signup-button');
    // Keep button enabled so click handlers can show feedback; validation
    // will still run on submit. This avoids situations where the button
    // becomes permanently disabled due to unexpected DOM state.
    if(btn) btn.disabled = false;
}

function updateSigninButtonState() {
    const u = document.getElementById('signin-username').value.trim();
    const p = document.getElementById('signin-password').value.trim();
    const btn = document.getElementById('signin-button');
    if(btn) btn.disabled = false;
}

function logout() {
    clearSession();
    currentUser = null;
    document.getElementById('app').style.display = 'none';
    document.getElementById('auth-container').style.display = 'flex';
}

function showApp() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    currentUser = getSession();
    refreshAll();
}

// page navigation
function switchPage(name) {
    // remove calf section if present
    const calfSec = document.getElementById('calf-section');
    if(calfSec) calfSec.remove();
    document.querySelectorAll('.page').forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
    });
    const page = document.getElementById(name + '-page');
    page.style.display = 'block';
    // trigger fade
    setTimeout(()=>page.classList.add('active'),10);
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.nav-btn[data-page="${name}"]`).classList.add('active');
    if (name === 'home') renderHome();
    if (name === 'cows') renderCows();
    if (name === 'expense') renderExpenses();
}

// rendering functions
function renderHome() {
    const cows = getData('cows_' + currentUser);
    const expenses = getData('expenses_' + currentUser);
    const cards = document.getElementById('home-cards');
    cards.innerHTML = '';
    if (cows.length === 0 && expenses.length === 0) {
        document.getElementById('home-empty').style.display = 'block';
        return;
    }
    document.getElementById('home-empty').style.display = 'none';
    const totalCows = cows.length;
    const male = cows.filter(c => c.gender === 'Male').length;
    const female = cows.filter(c => c.gender === 'Female').length;
    const totalExp = expenses.reduce((s,e)=>s+parseFloat(e.amount),0);
    const now = new Date();
    const monthExp = expenses.filter(e=>{
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear()===now.getFullYear();
    }).reduce((s,e)=>s+parseFloat(e.amount),0);
    const data = [
        {label:t('total_cows'), value:totalCows},
        {label:t('male_count'), value:male},
        {label:t('female_count'), value:female},
        {label:t('total_exp'), value:totalExp.toFixed(2)},
        {label:t('this_month'), value:monthExp.toFixed(2)}
    ];
    data.forEach(d=>{
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<h4>${d.label}</h4><p>${d.value}</p>`;
        cards.appendChild(card);
    });
}

function renderCows() {
    const cows = getData('cows_' + currentUser);
    const list = document.getElementById('cows-list');
    const empty = document.getElementById('cows-empty');
    list.innerHTML = '';
    if (cows.length === 0) {
        empty.style.display = 'block';
    } else {
        empty.style.display = 'none';
    }
    cows.forEach(c=>{
        const card = document.createElement('div');
        card.classList.add('card');
        const age = ageFromDOB(c.dob);
        const calves = getData('calves_' + currentUser).filter(x=>x.motherId===c.id);
        card.innerHTML = `
            ${c.photo?`<img src="${c.photo}" class="card-photo" alt="cow">`:''}
            <h4>${c.name}</h4>
            <p>ID: ${c.id}</p>
            <p>${t('dob')}: ${formatDate(c.dob)}</p>
            <p>${t('gender')}: ${t(c.gender.toLowerCase())}</p>
            <p>${t('age')}: ${age !== '' ? age : 0}</p>
            <span class="badge">${calves.length}</span>
            <div class="card-actions">
              <button class="edit-cow" data-id="${c.id}">${t('edit')}</button>
              <button class="delete-cow" data-id="${c.id}">${t('delete')}</button>
              <button class="view-calves" data-id="${c.id}">${t('view_calves')}</button>
            </div>
        `;
        list.appendChild(card);
    });
    // attach listeners
    document.querySelectorAll('.view-calves').forEach(btn=>{
        btn.addEventListener('click',e=>{
            const id = e.target.dataset.id;
            showCalves(id);
        });
    });
    document.querySelectorAll('.edit-cow').forEach(btn=>{
        btn.addEventListener('click',e=>{
            editCow(e.target.dataset.id);
        });
    });
    document.querySelectorAll('.delete-cow').forEach(btn=>{
        btn.addEventListener('click',e=>{
            deleteCow(e.target.dataset.id);
        });
    });
}

function deleteCow(id) {
    let cows = getData('cows_' + currentUser);
    cows = cows.filter(c=>c.id!==id);
    setData('cows_' + currentUser, cows);
    // remove calves belonging to cow
    let calves = getData('calves_' + currentUser);
    calves = calves.filter(x=>x.motherId!==id);
    setData('calves_' + currentUser, calves);
    renderCows();
}

function editCow(id) {
    const cows = getData('cows_' + currentUser);
    const cow = cows.find(c=>c.id===id);
    if(cow){
        currentEditCowId = id;
        document.getElementById('cow-id').value = cow.id;
        document.getElementById('cow-name').value = cow.name;
        document.getElementById('cow-gender').value = cow.gender;
        document.getElementById('cow-dob').value = cow.dob;
        document.getElementById('cow-photo').value = null;
        const preview = document.getElementById('cow-photo-preview');
        if(cow.photo){
            preview.src = cow.photo;
            preview.style.display = 'block';
        } else {
            preview.src = '';
            preview.style.display = 'none';
        }
        document.getElementById('cow-form-container').style.display='block';
        applyTranslations();
    }
}

function deleteCalf(id,motherId){
    let calves = getData('calves_' + currentUser);
    calves = calves.filter(x=>x.id!==id);
    setData('calves_' + currentUser, calves);
    showCalves(motherId);
}

function clearAllData(){
    setData('cows_' + currentUser, []);
    setData('calves_' + currentUser, []);
    setData('expenses_' + currentUser, []);
    refreshAll();
}

function showCalves(motherId) {
    // create an overlay or form
    const calves = getData('calves_' + currentUser).filter(x=>x.motherId===motherId);
    let html = `<h3>${t('add_calf')}</h3>`;
    // mother dropdown showing all female cows
    const femaleCows = getData('cows_' + currentUser).filter(c=>c.gender==='Female');
    html += `<select id="calf-mother">`;
    femaleCows.forEach(c=>{
        html += `<option value="${c.id}" ${c.id===motherId?'selected':''}>${c.name}</option>`;
    });
    html += `</select>`;
    html += `<input type="text" id="calf-name" placeholder="${t('name')}">`;
    html += `<select id="calf-gender"><option value="Male">${t('male')}</option><option value="Female">${t('female')}</option></select>`;
    html += `<input type="date" id="calf-dob">`;
    html += `<input type="file" id="calf-photo" accept="image/*">`;
    html += `<img id="calf-photo-preview" class="form-photo-preview" src="" alt="" style="display:none;">`;
    html += `<select id="calf-status"><option value="Alive">Alive</option><option value="Sold">Sold</option><option value="Dead">Dead</option></select>`;
    html += `<button id="save-calf">${t('save')}</button>`;
    html += `<div id="calves-list">`;
    calves.forEach(c=>{
        const age = ageFromDOB(c.dob);
        html += `<div class="card">`;
        if(c.photo){html += `<img src="${c.photo}" class="card-photo" alt="calf">`;}
        html += `<h4>${c.name}</h4><p>${t('gender')}: ${t(c.gender.toLowerCase())}</p><p>${t('age')}: ${age}</p><p>${t('status')}: ${c.status}</p>
                <div class="card-actions">
                    <button class="edit-calf" data-id="${c.id}">${t('edit')}</button>
                    <button class="delete-calf" data-id="${c.id}">${t('delete')}</button>
                </div>
                </div>`;
    });
    html += `</div>`;
    const container = document.createElement('div');
    container.classList.add('form-container');
    container.innerHTML = html;
    // remove existing calf section if any
    const existing = document.getElementById('calf-section');
    if (existing) existing.remove();
    container.id = 'calf-section';
    document.getElementById('cows-page').appendChild(container);
    applyTranslations();
    // add preview listener for calf photo
    const calfPhotoInput = document.getElementById('calf-photo');
    const calfPreview = document.getElementById('calf-photo-preview');
    if(calfPhotoInput){
        calfPhotoInput.addEventListener('change',e=>{
            const file = e.target.files[0];
            if(file){
                const reader = new FileReader();
                reader.onload = ev=>{
                    calfPreview.src = ev.target.result;
                    calfPreview.style.display='block';
                };
                reader.readAsDataURL(file);
            } else {
                calfPreview.src='';
                calfPreview.style.display='none';
            }
        });
    }
    document.getElementById('save-calf').addEventListener('click',()=>{
        const name = document.getElementById('calf-name').value.trim();
        const gender = document.getElementById('calf-gender').value;
        const dob = document.getElementById('calf-dob').value;
        const status = document.getElementById('calf-status').value;
        const photoInput = document.getElementById('calf-photo');
        if(!name||!dob){alert('Fill fields');return;}
        const calvesAll = getData('calves_' + currentUser);
        function finishCalfSave(photoData){
            if(currentEditCalfId){
                const idx = calvesAll.findIndex(x=>x.id===currentEditCalfId);
                if(idx!==-1){
                    calvesAll[idx] = {id:currentEditCalfId,name,gender,dob,motherId:document.getElementById('calf-mother').value,status,photo:photoData || calvesAll[idx].photo};
                }
                currentEditCalfId = null;
            } else {
                calvesAll.push({id:'calf_'+Date.now(),name,gender,dob,motherId:document.getElementById('calf-mother').value,status,photo:photoData});
            }
            setData('calves_' + currentUser, calvesAll);
            showCalves(motherId);
        }
        if(photoInput && photoInput.files && photoInput.files[0]){
            const reader = new FileReader();
            reader.onload = function(e){finishCalfSave(e.target.result);};
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            finishCalfSave(null);
        }
    });
    // edit/delete calf listeners
    document.querySelectorAll('.edit-calf').forEach(btn=>{
        btn.addEventListener('click',e=>{
            const cid = e.target.dataset.id;
            const calf = getData('calves_' + currentUser).find(x=>x.id===cid);
            if(calf){
                currentEditCalfId = cid;
                document.getElementById('calf-name').value = calf.name;
                document.getElementById('calf-gender').value = calf.gender;
                document.getElementById('calf-dob').value = calf.dob;
                document.getElementById('calf-status').value = calf.status;
                document.getElementById('calf-mother').value = calf.motherId;
                document.getElementById('calf-photo').value = null;
                const preview = document.getElementById('calf-photo-preview');
                if(calf.photo){
                    preview.src = calf.photo;
                    preview.style.display = 'block';
                } else {
                    preview.src = '';
                    preview.style.display = 'none';
                }
            }
        });
    });
    document.querySelectorAll('.delete-calf').forEach(btn=>{
        btn.addEventListener('click',e=>{
            const cid = e.target.dataset.id;
            deleteCalf(cid,motherId);
        });
    });
}


function renderExpenses() {
    // expenses page already has delete on card if desired
    const exps = getData('expenses_' + currentUser);
    const list = document.getElementById('expenses-list');
    const empty = document.getElementById('expenses-empty');
    list.innerHTML = '';
    if (exps.length === 0) {
        empty.style.display = 'block';
    } else {
        empty.style.display = 'none';
    }
    exps.forEach(e=>{
        const card = document.createElement('div');
        card.classList.add('card');
        const amt = parseFloat(e.amount).toFixed(2) + ' LKR';
        card.innerHTML = `<h4>${formatDate(e.date)}</h4><p>${t(e.type.toLowerCase())}: ${amt}</p><p>${e.notes}</p>`;
        list.appendChild(card);
    });
    const total = exps.reduce((s,e)=>s+parseFloat(e.amount),0);
    document.getElementById('total-exp').textContent = total.toFixed(2) + ' LKR';
    const now = new Date();
    const month = exps.filter(e=>{
        const d=new Date(e.date);
        return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
    }).reduce((s,e)=>s+parseFloat(e.amount),0);
    document.getElementById('month-exp').textContent = month.toFixed(2) + ' LKR';
}

function refreshAll() {
    switchPage('home');
    renderHome();
    renderCows();
    renderExpenses();
}

// events
window.addEventListener('load', () => {
    const users = loadUsers();
    // if no users exist, default to signup screen
    if (users.length === 0) {
        document.getElementById('signin-box').style.display = 'none';
        document.getElementById('signup-box').style.display = 'block';
        // ensure tab state matches
        if(typeof showAuth === 'function') showAuth('signup');
    }
    const sess = getSession();
    if (sess) {
        currentUser = sess;
        document.getElementById('auth-container').style.display='none';
        document.getElementById('app').style.display='block';
        refreshAll();
    }
    // if there are users and no session, show signin tab by default
    if(users.length > 0 && !getSession()){
        if(typeof showAuth === 'function') showAuth('signin');
    }
    document.getElementById('signin-button').addEventListener('click', trySignIn);
    document.getElementById('signup-button').addEventListener('click', trySignUp);
    // input listeners to toggle enable/disable
    document.getElementById('signup-username').addEventListener('input', updateSignupButtonState);
    document.getElementById('signup-password').addEventListener('input', updateSignupButtonState);
    document.getElementById('signin-username').addEventListener('input', updateSigninButtonState);
    document.getElementById('signin-password').addEventListener('input', updateSigninButtonState);
    // initialize states
    updateSignupButtonState();
    updateSigninButtonState();
    // legacy anchor links
    document.getElementById('show-signup').addEventListener('click', e=>{e.preventDefault(); showAuth('signup');});
    document.getElementById('show-signin').addEventListener('click', e=>{e.preventDefault(); showAuth('signin');});

    // tab buttons
    const tabSignIn = document.getElementById('tab-signin');
    const tabSignUp = document.getElementById('tab-signup');
    if(tabSignIn && tabSignUp){
        tabSignIn.addEventListener('click', ()=> showAuth('signin'));
        tabSignUp.addEventListener('click', ()=> showAuth('signup'));
    }
    document.getElementById('logout-button').addEventListener('click', logout);
    document.getElementById('clear-data').addEventListener('click', clearAllData);
    document.querySelectorAll('.nav-btn').forEach(btn=>{
        btn.addEventListener('click',()=>switchPage(btn.dataset.page));
    });
    document.getElementById('add-cow-btn').addEventListener('click',()=>{
        currentEditCowId = null;
        const idField = document.getElementById('cow-id');
        const newId = 'cow_' + Date.now();
        idField.value = newId;
        document.getElementById('cow-name').value = '';
        document.getElementById('cow-gender').value = 'Male';
        document.getElementById('cow-dob').value = '';
        document.getElementById('cow-photo').value = null;
        currentCowPhoto = null;
        document.getElementById('cow-form-container').style.display='block';
        applyTranslations();
    });
    document.getElementById('cancel-cow').addEventListener('click',()=>{
        document.getElementById('cow-form-container').style.display='none';
        document.getElementById('cow-error').textContent='';
    });
    document.getElementById('save-cow').addEventListener('click',()=>{
        const id = document.getElementById('cow-id').value.trim();
        const name = document.getElementById('cow-name').value.trim();
        const gender = document.getElementById('cow-gender').value;
        const dob = document.getElementById('cow-dob').value;
        const photoInput = document.getElementById('cow-photo');
        const err = document.getElementById('cow-error');
        err.textContent = '';
        if(!id||!name||!dob){err.textContent='Fill fields'; return;}
        const cows = getData('cows_' + currentUser);
        let photoData = null;
        if(photoInput && photoInput.files && photoInput.files[0]){
            const reader = new FileReader();
            reader.onload = function(e){
                photoData = e.target.result;
                finishCowSave();
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            finishCowSave();
        }
        function finishCowSave(){
            if(currentEditCowId){
                const idx = cows.findIndex(c=>c.id===currentEditCowId);
                if(idx!==-1){
                    cows[idx] = {id,name,gender,dob,photo: photoData || cows[idx].photo};
                }
            } else {
                cows.push({id,name,gender,dob,photo: photoData});
            }
            setData('cows_' + currentUser, cows);
            currentEditCowId = null;
            document.getElementById('cow-form-container').style.display='none';
            renderCows();
        }
    });

    document.getElementById('save-exp').addEventListener('click',()=>{
        const date = document.getElementById('exp-date').value;
        const type = document.getElementById('exp-type').value;
        let amount = document.getElementById('exp-amount').value;
        const notes = document.getElementById('exp-notes').value;
        const err = document.getElementById('exp-error');
        err.textContent='';
        if(!date||!amount){err.textContent='Fill required'; return;}
        // strip non-numeric
        amount = amount.replace(/[^\\d.]/g,'');
        const exps = getData('expenses_' + currentUser);
        exps.push({id:'exp_'+Date.now(),date,type,amount,notes});
        setData('expenses_' + currentUser, exps);
        renderExpenses();
    });
    document.getElementById('lang-select').addEventListener('change',e=>{
        currentLang = e.target.value;
        localStorage.setItem('language', currentLang);
        applyTranslations();
        refreshAll();
    });
    const savedLang = localStorage.getItem('language');
    if(savedLang){currentLang=savedLang;document.getElementById('lang-select').value=currentLang;}
    applyTranslations();

    // preview handlers for photo inputs
    document.getElementById('cow-photo').addEventListener('change',e=>{
        const file = e.target.files[0];
        const preview = document.getElementById('cow-photo-preview');
        if(file){
            const reader = new FileReader();
            reader.onload = ev=>{
                preview.src = ev.target.result;
                preview.style.display='block';
            };
            reader.readAsDataURL(file);
        } else {
            preview.src='';
            preview.style.display='none';
        }
    });
    // calf preview listener attached dynamically when form created
});

function applyTranslations(){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
        const key = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', t(key));
    });
}

function showAuth(mode){
    const signin = document.getElementById('signin-box');
    const signup = document.getElementById('signup-box');
    const tabSignIn = document.getElementById('tab-signin');
    const tabSignUp = document.getElementById('tab-signup');
    if(mode==='signin'){
        signin.style.display = 'block';
        signup.style.display = 'none';
        if(tabSignIn) tabSignIn.classList.add('active');
        if(tabSignUp) tabSignUp.classList.remove('active');
    } else {
        signin.style.display = 'none';
        signup.style.display = 'block';
        if(tabSignUp) tabSignUp.classList.add('active');
        if(tabSignIn) tabSignIn.classList.remove('active');
    }
}

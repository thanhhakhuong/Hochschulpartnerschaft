
/** Auswahlmöglichkeiten für die Dropdowns der Filter 'Land', 'Fakultät' und 'Vertragstyp' in der Hauptansicht
 * institutes.html aus Datenbank laden.
 * Ebenso in den Dropdowns der Filter in den Modalen 'Bearbeiten' und 'Anlegen'. Im Modal 'Bearbeiten' in der Ansicht
 * 'Partnerschaftsverträgeansicht' findet sich zusätzlich das Dropdown 'Mentor', welches ebenfalls beladen wird.
 */
function setupFilter() {
    $.get('/get/countries', function (data2) {
        $.each(data2, function (index2) {
            let x = data2[index2];
            //add new option to my dropdown select items
            //country ID = value
            //country eng = name (text)
            $(' .filter_country').append($('<option>', {
                //add to selected in modal (modal to add new institute)
                value: x['id'],
                text: x['country']
            }));
        });
    });
    $.get('/get/faculties', function (data3) {
        //add to filter on main page
        const arr = Array.from(data3)
        console.log(arr);
        let faculties = {};
        $.each(data3, function (index3) {
            let faculty = data3[index3];
            $(' .select_faculty').append($('<option>', {
                value: faculty['id'],
                text: faculty['fac']
            })); //Name of option = faculty['fac'] == Name; value = faculty['id'] == Fac_ID
            faculties[faculty['id']] = faculty['fac'];
        });
        sessionStorage.setItem('faculties', JSON.stringify(faculties));
    });
    $.get('/get/agreements', function (data3) {
        //add to filter on main page
        $.each(data3, function (index3) {
            let agreement = data3[index3];
            $(' .fil_agree').append($('<option>', {
                value: agreement['ID'],
                text: agreement['ps_type']
            })); //Name of option = faculty['fac'] == Name; value = faculty['id'] == Fac_ID
        });
    });
    loadMentorDropdown();
}

/** Belädt das Dropdown 'Mentor' mit den Inhalten aus der Datenbank*/
function loadMentorDropdown() {
    $.get('/loader/mentor', (data) => {
        let mentors = {};
       $.each(data, (index) => {
           let mentor = data[index];
           $(' .loadMentor').append($('<option>', {
               value: `${mentor['ID']}`,
               text: `${mentor['title']} ${mentor['firstname']} ${mentor['lastname']}`
            }));
           mentors[mentor['ID']] = {'title': mentor['title'], 'firstname': mentor['firstname'], 'lastname': mentor['lastname']};
       });
       sessionStorage.setItem('mentors', JSON.stringify(mentors));
    });
}
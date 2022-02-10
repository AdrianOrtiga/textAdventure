/********************
 * 
 *  CONSTANTS
 * 
 *  */
const _MIN_OPTIONS_LEVEL = 2

/********************
 * 
 *  VARIABLES
 * 
 *  */
var title = ''
var description = ''
var optionsCount = [_MIN_OPTIONS_LEVEL] // how many options have each level
var optionValues = [[]] // the text of the option of each levels
var levelsCount = -1 // how many levels there are
var instructLvlsValues = [] // the description of each levels.
var linkValues = [[]] // link value select in the option of each level


loadProjectFromDocument()

// check if is the user is updating the project
function loadProjectFromDocument(){
    let stillLevels = true
    for(let level= 0;stillLevels;level++){
        if(document.getElementById(`level${level}`) != null){
            levelsCount++
            optionValues[levelsCount] = []
            linkValues[levelsCount] = []
            optionsCount[level] = countOptionsLevel(level)
            saveOptionsText(level)
            if(optionsCount[level] > _MIN_OPTIONS_LEVEL) createDeleteOptionBtnIfneeded(level, true)
            continue
        }
        stillLevels = false
    }
}

function countOptionsLevel(level){
    let optionsCount = 0
    let stillOptions = true
    for(let optionNumber= 1;stillOptions;optionNumber++){
        const optionId = `level${level}option${optionNumber}`          
        const option = document.getElementById(optionId)
        if(optionId == 3) createDeleteOptionBtnIfneeded(level)
        if(option != null){
            optionValues[level][optionNumber] = option.firstChild.value // de option is a div
            optionsCount++
            continue
        }
        stillOptions = false
    }

    return optionsCount
}

/******************* 
        functions
    **********************/
function addOption(level = 0) {
    optionsCount[level]++
    createNewOption(level)
}

function createNewOption(level = 0) {
    saveOptionsText(level)
    addOptionDivElement(level)
    updateDropdowns()
    reloadOptionsText(level)

    createDeleteOptionBtnIfneeded(level)
}

function createDeleteOptionBtnIfneeded(level, update = false) {
    const levelDeleteBtnId = "deleteOptionsButtonLevel" + level
    const deleteSectionButton = document.getElementById(levelDeleteBtnId)

    let haveToAddDeleteBtn = optionsCount[level] <= _MIN_OPTIONS_LEVEL+1 // Adding the constant _MIN_OPTIONS_LEVEL,there was a 3 here 

    if(update) haveToAddDeleteBtn = true
    if (haveToAddDeleteBtn) {
        // add delete option button

        if (true) {
            const delOptionBtn = document.createElement('button')
            const onclickFuntion = `deleteOption(${level})`

            delOptionBtn.classList.add("option")
            delOptionBtn.classList.add("option-btn")
            delOptionBtn.textContent = ' - Delete option '
            delOptionBtn.setAttribute('onclick', onclickFuntion)

            deleteSectionButton.append(delOptionBtn)
        }
        else {
            deleteSectionButton.innerHTML =
                '<button onclick="deleteOption(document.getElementById(' + "'" + level + "'" + ').innerText)" ' +
                'class="option option-btn"> - Delete option </button>'
        }

    }

}

function saveOptionsText(level) {
    for (optionNumber = 1; optionNumber <= optionsCount[level]; optionNumber++) {
        const optionId = "level" + level + "option" + optionNumber

        if (document.getElementById(optionId) == null) return

        const option = document.getElementById(optionId).firstElementChild

        optionValues[level][optionNumber] = option.value
        saveLinkOption(level, optionNumber)
    }
}

function saveLinkOption(level, optionLNumber) {
    const linkOptionId = "level" + level + "link" + optionLNumber
    const linkOption = document.getElementById(linkOptionId)

    if (linkOption != null)
        linkValues[level][optionLNumber] = linkOption.value
}

function addOptionDivElement(level, optionNumber = optionsCount[level]) {
    const levelOptionsId = "aditionalOptionsLevel" + level
    const aditionalOptions = document.getElementById(levelOptionsId)

    const newDiv = document.createElement('div')
    const idNewDiv = 'level' + level + 'option' + optionNumber

    newDiv.setAttribute('id', idNewDiv)

    const inputOption = document.createElement('input')
    const inputValue = 'option ' + optionNumber

    inputOption.classList.add('option')
    inputOption.setAttribute('value', inputValue)


    const linkOption = document.createElement('select')
    const idLinkOption = 'level' + level + 'link' + optionNumber

    linkOption.setAttribute('id', idLinkOption)
    linkOption.classList.add('link-option')

    const voidOptionLink = document.createElement('option')
    voidOptionLink.textContent = 'Select level to link'

    linkOption.append(voidOptionLink)

    newDiv.append(inputOption)
    newDiv.append(linkOption)
    
    aditionalOptions.append(newDiv)

    if (false)
        aditionalOptions.innerHTML +=
            '<div id="level' + level + 'option' + optionNumber + '">' +
            '<input class= "option" value="option ' + optionNumber + '">' +
            '<select class="link-option" id="level' + level + 'link' + optionNumber + '">' +
            '<option value="">Select a level to link</option>' +
            '</select>' +
            '</div>'
}

function reloadOptionsText(level) {

    for (const optionNumber in optionValues[level]) {
        loadTextOption(level, optionNumber)
        loadLinkOption(level, optionNumber)
    }
}

function loadTextOption(level, optionTNumber) {
    const optionText = optionValues[level][optionTNumber];
    const optionId = "level" + level + "option" + optionTNumber

    if (document.getElementById(optionId) == null) return

    const option = document.getElementById(optionId).firstElementChild

    option.value = optionText
}

function loadLinkOption(level, optionLNumber) {
    const linkOptionId = "level" + level + "link" + optionLNumber
    const linkOption = document.getElementById(linkOptionId)

    linkOption.value = linkValues[level][optionLNumber]
}

function deleteOption(level = 0) {
    const optionId = "level" + level + "option" + optionsCount[level]
    const optionToDelete = document.getElementById(optionId)

    optionValues[level].splice(optionNumber, 1)
    linkValues[level].splice(optionNumber, 1)
    optionToDelete.remove()
    optionsCount[level]--

    if (optionsCount[level] <= _MIN_OPTIONS_LEVEL) {
        const levelDeleteOptBtnId = "deleteOptionsButtonLevel" + level
        const deleteSection = document.getElementById(levelDeleteOptBtnId)
        deleteSection.children[0].remove()
    }
}

function addLevel() {
    saveProject()
    createNewLevel()
    loadProject()
    updateDropdowns()
}

function createNewLevel() {
    levelsCount++
    optionsCount[levelsCount] = _MIN_OPTIONS_LEVEL
    optionValues[levelsCount] = []
    linkValues[levelsCount] = []

    createHtmlLevel(levelsCount)
}

function createHtmlLevel(level) {
    const additionalLevelSection = document.getElementById("additionalLevels")

    if(true){
        const newSection = document.createElement('section')
        const idNewSection = 'level' + level
        newSection.setAttribute('id', idNewSection)

        const titleH2 = document.createElement('h2')
        titleH2.innerText = `Level ${level}`
        newSection.append(titleH2)

        const levelDiv = document.createElement('div')
        levelDiv.classList.add('level')

        const textareaLevel = document.createElement('textarea')
        textareaLevel.setAttribute('id', `description${level}`)
        textareaLevel.setAttribute('rows', `5`)
        textareaLevel.innerText = 'Write here the instructions'
        levelDiv.append(textareaLevel)

        const optionsDiv = document.createElement('div')
        const levelOpt1Div = document.createElement('div')
        const levelOpt2Div = document.createElement('div')
        const lvlAddOptDiv = document.createElement('div')
        const DelBtnOptDiv = document.createElement('div')
        
        levelOpt1Div.setAttribute('id',`level${level}option1`)
        levelOpt2Div.setAttribute('id',`level${level}option2`)
        lvlAddOptDiv.setAttribute('id',`aditionalOptionsLevel${level}`)
        DelBtnOptDiv.setAttribute('id',`deleteOptionsButtonLevel${level}`)

        const inputOpt1 = document.createElement('input')
        inputOpt1.setAttribute('type', 'text')
        inputOpt1.setAttribute('value', 'option 1')
        inputOpt1.classList.add('option')
        const selLinkOpt1 = document.createElement('select')
        selLinkOpt1.setAttribute('id',`level${level}link1`)
        selLinkOpt1.classList.add('link-option')
        const optSel1 = document.createElement('option')
        optSel1.innerText = 'Select level to link'
        selLinkOpt1.append(optSel1)

        levelOpt1Div.append(inputOpt1)
        levelOpt1Div.append(selLinkOpt1)

        const inputOpt2 = document.createElement('input')
        inputOpt2.setAttribute('type', 'text')
        inputOpt2.setAttribute('value', 'option 2')
        inputOpt2.classList.add('option')
        const selLinkOpt2 = document.createElement('select')
        selLinkOpt2.setAttribute('id',`level${level}link2`)
        selLinkOpt2.classList.add('link-option')
        const optSel2 = document.createElement('option')
        optSel2.innerText = 'Select level to link'
        selLinkOpt2.append(optSel2)

        levelOpt2Div.append(inputOpt2)
        levelOpt2Div.append(selLinkOpt2)
        
        const AddOptBtn = document.createElement('button')
        AddOptBtn.classList.add('option')
        AddOptBtn.classList.add('option-btn')
        AddOptBtn.setAttribute('onclick',`addOption(${level})`)
        AddOptBtn.innerText = '+ Add additional option'

        optionsDiv.append(levelOpt1Div)
        optionsDiv.append(levelOpt2Div)
        optionsDiv.append(lvlAddOptDiv)
        optionsDiv.append(DelBtnOptDiv)
        optionsDiv.append(AddOptBtn)
        levelDiv.append(optionsDiv)

        const delLvlBtnDiv = document.createElement('div')
        const delLevelBtn = document.createElement('button')
        delLevelBtn.classList.add('btn-level')
        delLevelBtn.setAttribute('onclick',`deleteLevel(${level})`)
        delLevelBtn.innerText = `- Delete Level ${level}`
        delLvlBtnDiv.append(delLevelBtn)
        
        newSection.append(levelDiv)
        newSection.append(delLvlBtnDiv)

        additionalLevelSection.append(newSection)
    }
    else {
        additionalLevelSection.innerHTML += '<section id="level' + level + '">' +
        '<div>' +
        '<h2>Level <span id="' + level + '">' + level + '</span></h2>' +
        '</div>' +
        '<div class="level">' +
        '<textarea name="" id="description' + level + '" rows="5">Write here the instructions</textarea>' +
        '<div>' +
        '<div id="level' + level + 'option1">' +
        '<input class="option" type="text" value="option 1">' +
        '<select class="link-option" id="level' + level + 'link1">' +
        '<option value="">Select a level to link</option>' +
        '</select>' +
        '</div>' +
        '<div id="level' + level + 'option2">' +
        '<input class="option" type="text" value="option 2">' +
        '<select class="link-option" id="level' + level + 'link2">' +
        '<option value="">Select a level to link</option>' +
        '</select>' +
        '</div>' +
        '<div id="aditionalOptionsLevel' + level + '">' +
        '</div>' +
        '<div id="deleteOptionsButtonLevel' + level + '">' +
        '</div>' +
        '<button class="option option-btn" onclick="addOption(document.getElementById(' + level + ').innerText)">' +
        '+ Add additional option</button>' +
        '</div>' +
        '</div>' +
        '<div>' +
        '<button class="btn-level" onclick="deleteLevel(document.getElementById(' + level + ').innerText)">' +
        '- Delete Level ' + level +
        ' </button>' +
        '</div>' +
        '</section>'
    }
}

function deleteLevel(level) {
    // save the project to build again the project after delete the level
    saveProject()

    // delete de level's link of all the selects
    const allSelects = document.querySelectorAll('select')
    allSelects.forEach(select => select.lastElementChild.remove())

    const levelSection = "level" + level
    const levelToDelete = document.getElementById(levelSection)
    // delete the level and remove all the additional options of the level
    levelToDelete.remove()
    removeAditionalOptionLevel(level)

    // remove all the levels to build the project again
    const additionalLevelSection = document.getElementById("additionalLevels")
    removeAlladitionalSection(additionalLevelSection)  

    createAllTheLevels()
    updateDropdowns()
    loadProject()
}

function removeAlladitionalSection(aditionalLevels){
    while (aditionalLevels.firstChild) {
        aditionalLevels.removeChild(aditionalLevels.firstChild);
    }
}

function removeAditionalOptionLevel(level) {
    optionsCount.splice(level, 1)
    optionValues.splice(level, 1)
    linkValues.splice(level, 1)
    instructLvlsValues.splice(level, 1)
    levelsCount--
}

function createAllTheLevels() {
    for (level = 0; level <= levelsCount; level++) {
        createHtmlLevel(level)

        const haveToAddOptions = optionsCount[level] >= _MIN_OPTIONS_LEVEL+1 

        if (haveToAddOptions) {
            for (option = _MIN_OPTIONS_LEVEL+1; option < optionValues[level].length; option++) {
                addOptionDivElement(level, option)
            }
        }
    }
}

function saveProject() {
    saveTitle()
    saveDescription()

    for (level = 0; level <= levelsCount; level++) {
        const levelId = "level" + level
        const levelSection = document.getElementById(levelId)
        if(levelSection == null) continue

        instructLvlsValues[level] = levelSection.children[1].children[0].value
        saveOptionsText(level)
    }
}

function saveProjectAndAlert(){
    saveProject()
    alert('The project have been saved')
}

function saveTitle(){
    const titleInput = document.getElementById('title')
    title = titleInput.value
}

function saveDescription(){
    const descInput = document.getElementById('adventureDesc')
    description = descInput.value
}

function loadProject() {
    for (level = 0; level < instructLvlsValues.length; level++) {
        const levelId = "level" + level
        const levelSection = document.getElementById(levelId)
        if(levelSection == null) continue

        levelSection.children[1].children[0].value = instructLvlsValues[level]
        reloadOptionsText(level)
    }
}

function updateDropdowns() {
    const linkOptionsDropdowns = document.querySelectorAll('select')

    for (level = 0; level <= levelsCount; level++) {
        linkOptionsDropdowns.forEach(linkOption => {
            const option = document.createElement('option')
            const levelText = "Level " + level

            option.value = levelText
            option.textContent = levelText

            levelNotAdded = !linkLevelAlreadyAdded(levelText, linkOption)

            if (levelNotAdded)
                linkOption.append(option)
        });
    }
}

function linkLevelAlreadyAdded(newLevel, selectDropdown) {

    for (const option in selectDropdown.options) {
        if (Object.hasOwnProperty.call(selectDropdown.options, option)) {
            const element = selectDropdown.options[option];
            if (element.value == newLevel) {
                return true
            }
        }
    }

    return false
}

/**********************
 * 
 *  SEND PROJECT 
 *      TO THE SERVER
 * 
 **********************/
function createProject() {
    saveProject()
    postProject()
}

function updateProject(){
    saveProject()
    postProject('load', 'GET')
}

function postProject(path = '', method = 'POST') {
    const errorMessage = checkError()

    if(errorMessage){
        alert(errorMessage)
        return
    }

    const form = document.createElement('form')
    form.action = path
    form.method = method

    form.appendChild(getTitle())
    form.appendChild(getDescription())
    form.appendChild(getLevelCounts())

    for (level = 0; level < instructLvlsValues.length; level++) {
        const instruct = instructLvlsValues[level]
        form.appendChild(getInstructions(instruct))
    }

    for (level = 0; level < optionValues.length; level++) {
        const options = optionValues[level]
        for(optNumb = 1; optNumb < options.length;optNumb++){
            const option = options[optNumb]
            form.appendChild(getOption(option, level))
        }
    }

    for (level = 0; level < linkValues.length; level++) {
        const links = linkValues[level]
        for(linkNumb = 1; linkNumb < links.length;linkNumb++){
            const link = links[linkNumb]
            form.appendChild(getLink(link, level))
        }
    }

    document.body.appendChild(form)

    if(confirm("Are you sure you want to create a project?")){
        form.submit()
    }
    else{
        form.remove()
    }
}

function checkError(){
    if(title == '') return 'You have to enter a title in order to save the project'
    if(description == '') return 'You have to enter a description in order to save the project'
    if(levelsCount < 0) return 'Your text adventure at least must have 1 level'
    
    return ''
}

function getTitle(){
    const hiddenField = document.createElement('input')
    hiddenField.type = 'hidden'
    hiddenField.name = 'title'
    hiddenField.value = title
    return hiddenField
}

function getDescription(){
    const hiddenField = document.createElement('input')
    hiddenField.type = 'hidden'
    hiddenField.name = 'description'
    hiddenField.value = description
    return hiddenField
}

function getLevelCounts() {
    // how many levels do we have
    const hiddenField = document.createElement('input')
    hiddenField.type = 'hidden'
    hiddenField.name = 'levelCounts'
    hiddenField.value = levelsCount

    return hiddenField
}

function getInstructions(instructions) {
    const hiddenField = document.createElement('input')
    hiddenField.type = 'hidden'
    hiddenField.name = `instructions`
    hiddenField.value = instructions
    return hiddenField
}

function getOption(option, level) {
    const hiddenField = document.createElement('input')
    hiddenField.type = 'hidden'
    hiddenField.name = `options${level}`
    hiddenField.value = option
    return hiddenField
}

function getLink(link, level) {
    const hiddenField = document.createElement('input')
    hiddenField.type = 'hidden'
    hiddenField.name = `links${level}`
    hiddenField.value = link
    return hiddenField
}


function showTheData(){

    console.log("optionsCount: ",optionsCount)
    console.log("optionValues: ", optionValues)
    console.log("levelsCount: ", levelsCount)
    console.log("instructLvlsValues: ",instructLvlsValues)
    console.log("linkValues: ",linkValues)
}

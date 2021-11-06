/********************
 * 
 *  VARIABLES
 * 
 *  */
var optionsCount = [2] // how many options have each level
var optionValues = [[]] // the text of the option of each levels
var levelsCount = 0 // how many levels there are
var instructLvlsValues = [] // the description of each levels.
var linkValues = [[]] // link value select in the option of each level

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

function createDeleteOptionBtnIfneeded(level) {
    const levelDeleteBtnId = "deleteOptionsButtonLevel" + level
    const deleteSectionButton = document.getElementById(levelDeleteBtnId)

    const haveToAddDeleteBtn = optionsCount[level] <= 3

    if (haveToAddDeleteBtn) {
        // add delete option button

        if (true) {
            const delOptionBtn = document.createElement('button')
            const onclickFuntion = 'deleteOption(document.getElementById(' + "'" + level + "'" + ').innerText)'

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
    voidOptionLink.textContent = 'Select a level to link'

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

    if (optionsCount[level] < 3) {
        const levelDeleteOptBtnId = "deleteOptionsButtonLevel" + level
        const deleteSection = document.getElementById(levelDeleteOptBtnId)
        deleteSection.innerHTML = ""
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
    optionsCount[levelsCount] = 2
    optionValues[levelsCount] = []
    linkValues[levelsCount] = []

    createHtmlLevel(levelsCount)
}

function createHtmlLevel(levelsCount) {
    const additionalLevelSection = document.getElementById("additionalLevels")

    additionalLevelSection.innerHTML += '<section id="level' + levelsCount + '">' +
        '<div>' +
        '<h2>Level <span id="' + levelsCount + '">' + levelsCount + '</span></h2>' +
        '</div>' +
        '<div class="level">' +
        '<textarea name="" id="description' + levelsCount + '" rows="5">Write here the instructions</textarea>' +
        '<div>' +
        '<div id="level' + levelsCount + 'option1">' +
        '<input class="option" type="text" value="option 1">' +
        '<select class="link-option" id="level' + levelsCount + 'link1">' +
        '<option value="">Select a level to link</option>' +
        '</select>' +
        '</div>' +
        '<div id="level' + levelsCount + 'option2">' +
        '<input class="option" type="text" value="option 2">' +
        '<select class="link-option" id="level' + levelsCount + 'link2">' +
        '<option value="">Select a level to link</option>' +
        '</select>' +
        '</div>' +
        '<div id="aditionalOptionsLevel' + levelsCount + '">' +
        '</div>' +
        '<div id="deleteOptionsButtonLevel' + levelsCount + '">' +
        '</div>' +
        '<button class="option option-btn" onclick="addOption(document.getElementById(' + levelsCount + ').innerText)">' +
        '+ Add additional option</button>' +
        '</div>' +
        '</div>' +
        '<div>' +
        '<button class="btn-level" onclick="deleteLevel(document.getElementById(' + levelsCount + ').innerText)">' +
        '- Delete Level ' + levelsCount +
        ' </button>' +
        '</div>' +
        '</section>'
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
    additionalLevelSection.innerHTML = ''

    createAllTheLevels()
    updateDropdowns()
    loadProject()
}

function removeAditionalOptionLevel(level) {
    optionsCount.splice(level, 1)
    optionValues.splice(level, 1)
    linkValues.splice(level, 1)
    instructLvlsValues.splice(level, 1)
    levelsCount--
}

function createAllTheLevels() {
    for (level = 1; level <= levelsCount; level++) {
        createHtmlLevel(level)

        const haveToAddOptions = optionsCount[level] >= 3

        if (haveToAddOptions) {
            for (option = 3; option < optionValues[level].length; option++) {
                addOptionDivElement(level, option)
            }
        }
    }
}

function saveProject() {
    for (level = 0; level <= levelsCount; level++) {
        const levelId = "level" + level
        const levelSection = document.getElementById(levelId).children[1].children[0]

        instructLvlsValues[level] = levelSection.value

        saveOptionsText(level)
    }
}

function loadProject() {
    for (level = 0; level < instructLvlsValues.length; level++) {
        const levelId = "level" + level
        const levelSection = document.getElementById(levelId).children[1].children[0]

        levelSection.value = instructLvlsValues[level]
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

function postProject(path = '', method = 'POST') {
    const form = document.createElement('form')
    form.action = path
    form.method = method

    form.appendChild(getLevelCounts())

    for (level = 0; level < instructLvlsValues.length; level++) {
        const instruct = instructLvlsValues[level]
        form.appendChild(getInstructions(instruct, level))
    }

    for (level = 0; level < optionValues.length; level++) {
        const options = optionValues[level]
        form.appendChild(getOptionsValues(options, level))
    }

    document.body.appendChild(form)
    form.submit()
}

function getLevelCounts() {
    // how many levels do we have
    const hiddenField = document.createElement('input')
    hiddenField.type = 'hidden'
    hiddenField.name = 'levelCounts'
    hiddenField.value = levelsCount

    return hiddenField
}

function getInstructions(instructions, level) {
    const hiddenField = document.createElement('input')
    hiddenField.type = 'hidden'
    hiddenField.name = `instructionsLvl${level}`
    hiddenField.value = instructions
    return hiddenField
}

function getOptionsValues(options, level) {
    const hiddenField = document.createElement('input')
    hiddenField.type = 'hidden'
    hiddenField.name = `options${level}`
    let allOptions = ''
    for(i = 1; i < options.length;i++){
        const option = options[i]
        if (option != undefined) {
            allOptions = allOptions + option + `;O#${count}#O;`
        }
    }

    hiddenField.value = allOptions
    return hiddenField
}



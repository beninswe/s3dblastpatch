

let dropArea = document.getElementById('drop-area')
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
	dropArea.addEventListener(eventName, (e) => {
		e.preventDefault()
		e.stopPropagation()
	}, false)
})

;['dragenter', 'dragover'].forEach(eventName => {
	dropArea.addEventListener(eventName, () => {
		dropArea.classList.add('highlight')
	}, false)
})

;['dragleave', 'drop'].forEach(eventName => {
	dropArea.addEventListener(eventName, () => {
		dropArea.classList.remove('highlight')
	}, false)
})

dropArea.addEventListener('drop', (e) => {
	let dt = e.dataTransfer
	let files = dt.files

	handleFiles(files)
}, false)

function handleFiles(files) {
	([...files]).forEach(uploadFile)
}
window.handleFiles = handleFiles

function uploadFile(file) {
	let progressbar = document.getElementById("progressbar")
	let statusbar = progressbar.querySelector('.status')
	progressbar.classList.remove('hidden')
	var reader = new FileReader();
	reader.onload = async (e) => {
		let rom = new Uint8Array(reader.result)

		rom.set( [ 0x00, 0x00 ], 0x644 )

		rom.set( [ 0x33, 0xFC, 0x00, 0x03, 0xFF, 0xFF, 0x0A, 0x1C, 0x4E, 0xB9, 0x00, 0x02,
			0x4F, 0x3A, 0x13, 0xFC, 0x00, 0x80, 0x00, 0xA0, 0x1C, 0x10, 0x33, 0xFC,
			0x00, 0x00, 0x00, 0xA1, 0x11, 0x00, 0x08, 0x39, 0x00, 0x04, 0xFF, 0xFF,
			0x06, 0xB8, 0x66, 0x06, 0x4E, 0xFA, 0xAE, 0xC4 ], 0x5570 )

		var b = new FileReader()
		b.onload = function(e) {
			document.querySelector('a.s3drom').href = b.result
		}
		b.readAsDataURL(new Blob([rom], {type: 'application/octet-stream'}) )

		document.getElementById("drop-areaholder").classList.add('hide')
		window.setTimeout(() => document.getElementById("drop-areaholder").classList.add('hidden'), 1000)
		document.getElementById("results").classList.remove('hidden')
	}
	reader.readAsArrayBuffer(file)
}
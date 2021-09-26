import React, {useState} from 'react';
import { Document, Page } from 'react-pdf';
import axios from 'axios';

function FileUploadPage(){
	const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);

	const [fileToRender, setFileToRender] = useState();
	
	const serverUrl='http://localhost:3300/upload';
	
	const serverUrlToRenderFile='http://localhost:3300/renderFile';
	
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	//headers: new Headers({
					//'Content-Type': 'application/pdf'
					//'Authorization': 'Bearer ' + token,
				//}),
				
	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('fileUploaded', selectedFile);

		fetch(serverUrl,
			{
				method: 'POST',				
				body: formData
			}
		)
		.then((response) => {
			console.log(response);
			//response.json();
		})
		.then((result) => {
			console.log('Success:', result);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	};

	const handleDisplayFile = async () => {
		/*
		axios(serverUrlToRenderFile, {
			method: 'GET',
			//responseType: 'blob',
			//headers: {       
				//'Content-Type': 'application/pdf',
			//}
		})
		.then((response) => {
			console.log(response);
			
			const file = new Blob([response.data]);	  		
			setFileToRender(URL.createObjectURL(file));
			//setFileToRender(Buffer(response).toString('base64'));
			//setFileToRender(response.data);
		})
		.catch((err) => {
			console.log(err);
		})
		*/
		
		const response = await fetch(serverUrlToRenderFile);
		const data = await response.json();
		console.log(response);
		console.log(data);
		setFileToRender(data);
		
		
		/*fetch(serverUrlToRenderFile)
		.then((response) => {
			response.json();
			console.log(response);
		})
		.then((result) => {
			console.log('Success:', result);
		})
		.catch((error) => {
			console.error('Error:', error);
		});*/
	}
	
	const onDocumentLoadSuccess = () => {
		console.log("Chal gya!!!!!!!!!!!!!!");
	}
	
	return(
		<div>
			<input type="file" name="fileUploaded" onChange={changeHandler} />
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
			<div>
				<button onClick={handleDisplayFile}>Display File</button>
			</div>
			{
				fileToRender && <Document file={fileToRender} onLoadSuccess={onDocumentLoadSuccess}></Document>
			}			

			{
				/*
				<object type="application/pdf" width="400" height="400" data={fileToRender}></object>
				*/
			}
		</div>
	);
}

export default FileUploadPage;
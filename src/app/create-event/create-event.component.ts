import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../services/event.service';

interface EventData {
  eventName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  description: string;
  category: string;
  allowedTicketsNumber: number;
  price: number;
}

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  @ViewChild('eventForm') eventForm!: NgForm;
  eventData: EventData = {
    eventName: '',
    eventDate: '',
    eventTime: '',
    location: '',
    description: '',
    category: '',
    allowedTicketsNumber: 1,
    price: 0
  };
  today: Date = new Date();
  selectedFile: File | null = null;
  message: string = '';
  submitted = false;

  constructor(private eventService: EventService, private httpClient: HttpClient) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  async onSubmit() {
    this.submitted = true;

    if (!this.eventForm.valid || !this.selectedFile) {
      this.message = 'Form is invalid or no file selected.';
      return;
    }
   
    try {
      const preSignedUrl = "https://objectstorage.eu-frankfurt-1.oraclecloud.com/p/67R69JOo2qGaTRgNyEJuEa3HKM7fPMkcwxm272X_I57mWnxpw03AjbJ9-sD42aSF/n/frrkyaorrjmz/b/EventHub_bucket/o/";
      if (!preSignedUrl) {
        throw new Error('Failed to get pre-signed URL');
      }

      const uploadedImageUrl = await this.uploadFileToBucket(this.selectedFile, preSignedUrl);
      if (!uploadedImageUrl) {
        throw new Error('Failed to upload image');
      }

      // Prepare the form data
      const formData = new FormData();
    formData.append('eventName', this.eventData.eventName);
    formData.append('eventDate', this.eventData.eventDate);
    formData.append('eventTime', this.eventData.eventTime);
    formData.append('location', this.eventData.location);
    formData.append('description', this.eventData.description);
    formData.append('category', this.eventData.category);
    formData.append('allowedTicketsNumber', this.eventData.allowedTicketsNumber.toString());
    formData.append('price', this.eventData.price.toString());
    if (this.selectedFile) {
      formData.append('eventPictureUrl', uploadedImageUrl);
    }
    

      // Make the API call with formData
      this.eventService.createEvent(formData).subscribe(
        response => {
          this.message = 'Event created successfully';
          this.eventForm.resetForm();
          this.submitted = false;
        },
        error => {
          this.message = 'Failed to create event';
          this.submitted = false;
        }
      );
    } catch (error) {
      this.message = error instanceof Error ? error.message : 'Unknown error occurred';
      this.submitted = false;
    }
  }

 

  uploadFileToBucket(file: File, preSignedUrl: string): Promise<string> {
    // Generate a unique file name
    const uniqueFileName = `event-${Date.now()}-${file.name}`;
    const uploadUrl = `${preSignedUrl}${encodeURIComponent(uniqueFileName)}`;
  
    return this.httpClient.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type
      },
      responseType: 'text'
    })
    .toPromise()
    .then(response => uploadUrl); // Return the URL with the unique file name upon successful upload
  }
}

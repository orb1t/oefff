import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

import {Feature, FeatureService, FeatureServiceImpl} from './feature.service';
import {OefffBackend} from "../oefff.backend";
import {RouterTestingModule} from "@angular/router/testing";


describe('FeatureService', () => {

    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                {provide: 'FeatureService', useClass: FeatureServiceImpl},
                OefffBackend]
        });

        // Inject the http service and test controller for each test
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);

    });


    it('should cast the response to a Feature', inject(['FeatureService'], (featureService: FeatureService) => {

        const mockFeature: Feature = {name: 'Read a feature from the HTTP Backend', description:'', children:[]};
        let feature : Feature = {name: "", description: '', children:[]};

        let featureObservable = featureService.getFeature("oefff", "http" ,"readFeatureFromServer");
        featureObservable.subscribe(data => feature = data);


        const getRequestForFeature = httpTestingController.expectOne('http://localhost:8080/api/projects/oefff/epics/http/features/readFeatureFromServer');

        // Assert that the request is a GET.
        expect(getRequestForFeature.request.method).toEqual('GET');
        getRequestForFeature.flush(mockFeature);


        expect(feature.name).toBe("Read a feature from the HTTP Backend");

        httpTestingController.verify();

    }));


});

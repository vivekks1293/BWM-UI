import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIPath } from '../../Shared/APIPaths';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimetableService {
  private readonly baseUrl = 'http://localhost:3000'; // Base URL for API calls
  private selectedTerm = new BehaviorSubject<{ termID: number | null; termName: string | null }>({
    termID: null,
    termName: null,
  });

  constructor(private http: HttpClient) { }

  getTerms(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${APIPath.GET_TERMS}${userId}`);
  }

  addTerm(term: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${APIPath.ADD_TERM}`, term);
  }

  updateTerm(term: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${APIPath.UPDATE_TERM}`, term);
  }

  selectedTerm$ = this.selectedTerm.asObservable(); // Observable for selected term

  setSelectedTerm(termID: number, termName: string): void {
    this.selectedTerm.next({ termID, termName });
  }

  clearSelectedTerm(): void {
    this.selectedTerm.next({ termID: null, termName: null }); // Clear term data
  }

  getSelectedTerm(): { termID: number | null; termName: string | null } {
    return this.selectedTerm.value;
  }

  getSubjects(termId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${APIPath.GET_SUBJECTS}${termId}`);
  }

  addSubject(subject: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${APIPath.ADD_SUBJECT}`, subject);
  }

  updateSubject(subject: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${APIPath.UPDATE_SUBJECT}`, subject);
  }

  getTimetables(termId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${APIPath.GET_TIMETABLES}${termId}`);
  }
  
  addTimetable(timetable: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${APIPath.ADD_TIMETABLE}`, timetable);
  }
  
  updateTimetable(timetable: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${APIPath.UPDATE_TIMETABLE}`, timetable);
  }
  selectTimetable(timetable: { time_table_id: number; termId: number }): Observable<any> {
    return this.http.put(`${this.baseUrl}${APIPath.SELECT_TIMETABLE}`, timetable);
  }
  getTimetableDetails(timetableId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${APIPath.GET_TIMETABLE_DETAILS}${timetableId}`);
  }
  updateTimetableData(payload: { time_table_id: number; time_table_data: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}${APIPath.UPDATE_TIMETABLE_DATA}`, payload);
  }  
  getActiveTimetable(termId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${APIPath.GET_ACTIVE_TIMETABLE}${termId}`);
  }

  getMarkAttendance(termId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${APIPath.GET_MARK_ATTENDANCE}${termId}`);
  }

  addMarkAttendance(payload: { termId: number; date: string; timeTableId: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}${APIPath.ADD_MARK_ATTENDANCE}`, payload);
  }
  deleteMarkAttendance(attendenceId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${APIPath.DELETE_MARK_ATTENDANCE}${attendenceId}`);
  }
  // updateMarkAttendance(attendenceId: number, payload: { date: string }): Observable<any> {
  //   return this.http.put(`${this.baseUrl}${APIPath.ADD_MARK_ATTENDANCE}`, payload);
  // }
  updateMarkAttendance(attendenceId: number, payload: { date: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}${APIPath.ADD_MARK_ATTENDANCE}/${attendenceId}`, payload);
  }
  getAttendanceDetails(attendenceId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${APIPath.GET_MARK_ATTENDANCE_DETAILS}${attendenceId}`);
  }
  getTimetableDateDetails(timetableId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${APIPath.GET_TIMETABLE_DATE_DETAILS}${timetableId}`);
  }

  updatekAttendanceData(attendenceId: number, payload: { timetableGrid: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}${APIPath.SET_TIMETABLE_DATE_DETAILS}/${attendenceId}`, payload);
  }
  updateAttendanceData(attendanceId: number, timetableGrid: string): Observable<any> {
    const url = `${this.baseUrl}${APIPath.UPDATE_ATTENDANCE_DATA}${attendanceId}`;
    return this.http.put(url, { timetableGrid });
  }
  getAttendanceByTimetable(timetableId: number): Observable<any> {
    const url = `${this.baseUrl}${APIPath.GET_ATTENDANCE_BY_TIMETABLE}${timetableId}`;
    return this.http.get(url);
  }
}

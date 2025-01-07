export function ReportIssue(){
    window.open(`mailto:helpdesk@mardens.com?subject=Trailer%20Tracker%20Issue&body=
             Please fill out the following: %0A
             - What happened: %0A
             - Steps to reproduce: %0A
             - Expected behavior (if applicable): %0A
             `, "_self")
}
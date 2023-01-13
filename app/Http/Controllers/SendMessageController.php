<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SendMessageController extends Controller
{
    public function sendMessage(Request $request){

        // we also validate all requests here then start to work them

        //if $request's validation completed successfully then we'll call mail service and sms channel

        // i don't want to create mail service now if you want i'll send you my older projects' mail services that how i developed

        return response()->json(['success'=> true]);
    }
}

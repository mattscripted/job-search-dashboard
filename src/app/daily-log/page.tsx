"use client";

import {
  Button,
  Card,
  Label,
  Textarea,
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "flowbite-react";
import { HiCalendar } from "react-icons/hi";

export default function DailyLogPage() {
  return (
    <>
      <Card>
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="comment">Your message</Label>
          </div>
          <Textarea id="comment" placeholder="Leave a comment..." required rows={4} />
          <Button>Post</Button>
        </div>
      </Card>
      <Timeline>
        <TimelineItem>
          <TimelinePoint icon={HiCalendar} />
          <TimelineContent>
            <TimelineTime>April 4, 2025</TimelineTime>
            <TimelineTitle>Started job search dashboard</TimelineTitle>
            <TimelineBody>
              Roughing out the job search dashboard to help me with, well, job searching!
            </TimelineBody>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelinePoint icon={HiCalendar} />
          <TimelineContent>
            <TimelineTime>April 3, 2025</TimelineTime>
            <TimelineTitle>Interviewed with HelloFresh</TimelineTitle>
            <TimelineBody>
              Had a recruiter chat with HelloFresh, and booked follow-up interviews.
            </TimelineBody>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
}

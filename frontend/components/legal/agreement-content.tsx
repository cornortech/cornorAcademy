import { ScrollArea } from "@radix-ui/react-scroll-area";
import React from "react";

const AgreementContent = () => {
  return (
    <ScrollArea className="h-96 pr-4">
      <div className="space-y-4 text-sm leading-relaxed">
        <section>
          <h3 className="font-semibold text-base mb-2">
            1. Course Enrollment Agreement
          </h3>
          <p className="text-muted-foreground">
            This agreement is entered into between Corner Academy ("Academy")
            and the student ("You" or "Student") regarding your enrollment in
            the course offered by the Academy. By signing this agreement, both
            parties acknowledge and agree to the terms and conditions outlined
            herein.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">
            2. Course Payment & Commitment
          </h3>
          <p className="text-muted-foreground">
            The student agrees to pay the full course fee as specified at the
            time of enrollment. Payment is non-refundable after 30 days from the
            enrollment date, except as provided in Section 4. The student
            commits to completing the course to the best of their ability and
            maintaining professional conduct throughout the program.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">
            3. Course Withdrawal & Cancellation
          </h3>
          <p className="text-muted-foreground">
            If the student wishes to withdraw from the course after enrollment,
            they must provide written notice to the Academy within 30 days of
            enrollment. Withdrawal after this period will result in forfeiture
            of the course fee. The Academy reserves the right to cancel a course
            if minimum enrollment is not met, in which case a full refund will
            be issued.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">
            4. Breach of Agreement & Legal Action
          </h3>
          <p className="text-muted-foreground">
            Any student who leaves the course after full or partial payment
            without valid grounds and prior agreement with the Academy will be
            considered in breach of this agreement. The Academy reserves the
            right to pursue legal action to recover outstanding fees, damages,
            or any other liabilities. This may include but is not limited to
            civil proceedings, debt recovery, and claims for punitive damages
            where applicable under law.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">
            5. Student Responsibilities
          </h3>
          <div className="text-muted-foreground">
            The student agrees to:
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Attend all scheduled classes and sessions as required</li>
              <li>
                Maintain professional conduct and respect the Academy's code of
                conduct
              </li>
              <li>Submit assignments and projects on time</li>
              <li>Comply with all Academy policies and procedures</li>
              <li>Not engage in plagiarism or academic dishonesty</li>
              <li>Maintain confidentiality of proprietary course materials</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">
            6. Academy's Obligations
          </h3>
          <div className="text-muted-foreground">
            Corner Academy agrees to:
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Provide quality instruction and course materials</li>
              <li>Maintain professional standards in all interactions</li>
              <li>Support student learning through designated channels</li>
              <li>Issue certificates upon course completion (if applicable)</li>
              <li>Maintain student data confidentiality</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">
            7. Limitation of Liability
          </h3>
          <p className="text-muted-foreground">
            Corner Academy shall not be liable for any indirect, incidental, or
            consequential damages arising from course participation. The
            Academy's total liability is limited to the amount paid by the
            student for the course.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">8. Governing Law</h3>
          <p className="text-muted-foreground">
            This agreement shall be governed by and construed in accordance with
            the laws of the jurisdiction in which Corner Academy operates. Any
            disputes arising from this agreement shall be subject to the
            exclusive jurisdiction of the courts in that jurisdiction.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">
            9. Modification of Terms
          </h3>
          <p className="text-muted-foreground">
            Corner Academy reserves the right to modify these terms and
            conditions with 30 days' notice to enrolled students. Continued
            participation in the course constitutes acceptance of modified
            terms.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-base mb-2">10. Entire Agreement</h3>
          <p className="text-muted-foreground">
            This agreement constitutes the entire agreement between the student
            and Corner Academy regarding course enrollment and supersedes all
            prior negotiations, understandings, and agreements.
          </p>
        </section>
      </div>
    </ScrollArea>
  );
};

export default AgreementContent;

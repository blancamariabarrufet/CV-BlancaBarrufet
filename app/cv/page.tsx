import InteractiveCv from "@/components/InteractiveCv";
import CvActionButtons from "@/components/CvActionButtons";
import cvData from "@/data/cv.json";

export default function CvPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{cvData.profile.name}</h1>
          <p className="text-2xl text-gray-700 mb-2">{cvData.profile.headline}</p>
          <p className="text-lg text-gray-600 mb-6">{cvData.profile.location}</p>

          {/* Summary */}
          <div className="max-w-3xl mx-auto mb-8">
            {cvData.summary.map((line, idx) => (
              <p key={idx} className="text-gray-700 mb-2">
                {line}
              </p>
            ))}
          </div>

          {/* Action Buttons */}
          <CvActionButtons email={cvData.profile.email} />
        </div>

        {/* Interactive CV Component */}
        <div className="max-w-6xl mx-auto">
          <InteractiveCv />
        </div>
      </div>
    </div>
  );
}

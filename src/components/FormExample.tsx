import {Input} from "@/components/atoms/input";
import {Checkbox} from "@/components/atoms/checkbox";
import {RadioGroup, RadioGroupItem} from "@/components/atoms/radio-group";

export default function FormExample() {
    return (
        <div className="space-y-4 p-6">
            {/* Input */}
            <Input placeholder="Masukkan nama" className="w-full" />

            {/* Checkbox */}
            <div className="flex items-center space-x-2">
                <Checkbox id="agree" />
                <label htmlFor="agree">Saya setuju dengan ketentuan</label>
            </div>

            {/* Radio Group */}
            <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="option1" />
                    <label htmlFor="option1">Pilihan 1</label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="option2" />
                    <label htmlFor="option2">Pilihan 2</label>
                </div>
            </RadioGroup>
        </div>
    );
}

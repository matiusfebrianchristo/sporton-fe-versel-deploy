import Button from "@/app/(landing)/components/ui/button"
import Modal from "../ui/modal"

type TBankInfoModalProps = {
    isOpen: boolean
    onClose: () => void
}

const BankInfoModal = ({isOpen, onClose}:TBankInfoModalProps) => {


    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Bank Account">
            <div className="flex flex-col gap-6">
                <div className="flex gap-7">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="input-group-admin">
                            <label htmlFor="bankInfoName">Bank Name</label>
                            <input type="text" id="bankInfoName" name="bankInfoName" placeholder="e. g. BCA, Mandiri, BRI" />
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="accountNumber">Account Number</label>
                            <input type="text" id="accountNumber" name="accountNumber" placeholder="e. g. 12313123" />
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="accountName">Account Name</label>
                            <input type="text" id="accountName" name="accountName" placeholder="Holder Name as registered on the account" />
                        </div>
                    </div>
                </div>
                <Button className="ml-auto mt-3 rounded-lg">Add Bank Account</Button>
            </div>
        </Modal>
    )
}

export default BankInfoModal